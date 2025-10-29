'''
Business: Manages user achievements (get user achievements, award achievements)
Args: event - dict with httpMethod, queryStringParameters, body
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
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
            user_id = params.get('user_id')
            
            if user_id:
                cur.execute('''
                    SELECT 
                        a.*,
                        ua.earned_at,
                        CASE WHEN ua.id IS NOT NULL THEN true ELSE false END as earned
                    FROM achievements a
                    LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = %s
                    ORDER BY earned DESC, a.id
                ''', (user_id,))
            else:
                cur.execute('SELECT * FROM achievements ORDER BY id')
            
            achievements = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'achievements': [dict(ach) for ach in achievements]
                }, default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            user_id = body_data.get('user_id')
            achievement_id = body_data.get('achievement_id')
            
            if not user_id or not achievement_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id и achievement_id обязательны'})
                }
            
            cur.execute(
                'INSERT INTO user_achievements (user_id, achievement_id) VALUES (%s, %s) ON CONFLICT DO NOTHING RETURNING *',
                (user_id, achievement_id)
            )
            result = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'achievement': dict(result) if result else None}, default=str)
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()
