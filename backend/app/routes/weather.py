from flask import Blueprint, jsonify, request
from app.services.weather_service import fetch_weather_data

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/weather', methods=['GET'])
def get_weather():
    q = request.args.get('q')
    if not q:
        return jsonify({'error': 'Missing location query parameter "q"'}), 400
    
    try:
        data = fetch_weather_data(q)
        return jsonify(data)
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

