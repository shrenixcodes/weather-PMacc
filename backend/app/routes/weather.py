from flask import Blueprint, jsonify, request

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/weather', methods=['GET'])
def get_weather():
    q = request.args.get('q')
    if not q:
        return jsonify({'error': 'Missing location query parameter "q"'}), 400
    
    # Placeholder for actual API call logic
    return jsonify({'message': f'Weather for {q}'})
