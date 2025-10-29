'''
Business: Manages games list and details
Args: event - dict with httpMethod, queryStringParameters
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
    
    if method == 'GET':
        conn = get_db_connection()
        cur = conn.cursor()
        
        try:
            cur.execute('''
                SELECT 
                    g.*,
                    COUNT(m.id) as mods_count
                FROM games g
                LEFT JOIN mods m ON g.id = m.game_id
                GROUP BY g.id
                ORDER BY mods_count DESC
            ''')
            games = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'games': [dict(game) for game in games]
                }, default=str)
            }
        
        finally:
            cur.close()
            conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
