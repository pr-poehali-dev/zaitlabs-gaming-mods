'''
Business: Manages mods (get list, get details, create, update, download tracking)
Args: event - dict with httpMethod, body, queryStringParameters, pathParams
      context - object with attributes: request_id, function_name, function_version, memory_limit_in_mb
Returns: HTTP response dict
'''
import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'], cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            game_id = params.get('game_id')
            category = params.get('category')
            sort = params.get('sort', 'downloads')
            limit = int(params.get('limit', '20'))
            offset = int(params.get('offset', '0'))
            
            query = '''
                SELECT 
                    m.*,
                    g.title as game_title,
                    g.slug as game_slug,
                    u.username as author_username
                FROM mods m
                JOIN games g ON m.game_id = g.id
                JOIN users u ON m.user_id = u.id
                WHERE 1=1
            '''
            query_params = []
            
            if game_id:
                query += ' AND m.game_id = %s'
                query_params.append(game_id)
            
            if category:
                query += ' AND m.category = %s'
                query_params.append(category)
            
            if sort == 'downloads':
                query += ' ORDER BY m.downloads_count DESC'
            elif sort == 'rating':
                query += ' ORDER BY m.rating DESC'
            elif sort == 'newest':
                query += ' ORDER BY m.created_at DESC'
            
            query += ' LIMIT %s OFFSET %s'
            query_params.extend([limit, offset])
            
            cur.execute(query, query_params)
            mods = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'mods': [dict(mod) for mod in mods],
                    'total': len(mods)
                }, default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            title = body_data.get('title', '').strip()
            description = body_data.get('description', '').strip()
            game_id = body_data.get('game_id')
            user_id = body_data.get('user_id')
            category = body_data.get('category', '').strip()
            image_url = body_data.get('image_url', '')
            download_url = body_data.get('download_url', '')
            version = body_data.get('version', '1.0')
            
            if not title or not game_id or not user_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Название, игра и пользователь обязательны'})
                }
            
            slug = title.lower().replace(' ', '-').replace('_', '-')
            
            cur.execute(
                '''INSERT INTO mods 
                (title, slug, description, game_id, user_id, category, image_url, download_url, version)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *''',
                (title, slug, description, game_id, user_id, category, image_url, download_url, version)
            )
            mod = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'mod': dict(mod)}, default=str)
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            mod_id = body_data.get('mod_id')
            
            if not mod_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'mod_id обязателен'})
                }
            
            action = body_data.get('action')
            
            if action == 'increment_downloads':
                cur.execute(
                    'UPDATE mods SET downloads_count = downloads_count + 1 WHERE id = %s RETURNING downloads_count',
                    (mod_id,)
                )
                result = cur.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'downloads_count': result['downloads_count']})
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()
