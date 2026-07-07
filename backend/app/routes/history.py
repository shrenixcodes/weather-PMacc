from flask import Blueprint, jsonify, request
from app.models import db, WeatherHistory
from app.schemas import weather_history_schema, weather_histories_schema
from marshmallow import ValidationError

history_bp = Blueprint('history', __name__)

@history_bp.route('/history', methods=['GET'])
def get_history():
    histories = WeatherHistory.query.order_by(WeatherHistory.created_at.desc()).all()
    return jsonify(weather_histories_schema.dump(histories))

@history_bp.route('/history', methods=['POST'])
def create_history():
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        data = weather_history_schema.load(json_data)
    except ValidationError as err:
        return jsonify({"error": err.messages}), 400

    new_history = WeatherHistory(
        location=data['location'],
        latitude=data['latitude'],
        longitude=data['longitude'],
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        temperature=data['temperature'],
        humidity=data['humidity'],
        pressure=data['pressure'],
        wind_speed=data['wind_speed'],
        weather=data['weather'],
        aqi=data.get('aqi')
    )

    db.session.add(new_history)
    db.session.commit()

    return jsonify(weather_history_schema.dump(new_history)), 201

@history_bp.route('/history/<int:id>', methods=['PUT'])
def update_history(id):
    history = WeatherHistory.query.get_or_404(id)
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        data = weather_history_schema.load(json_data, partial=True)
    except ValidationError as err:
        return jsonify({"error": err.messages}), 400

    if 'location' in data: history.location = data['location']
    if 'latitude' in data: history.latitude = data['latitude']
    if 'longitude' in data: history.longitude = data['longitude']
    if 'temperature' in data: history.temperature = data['temperature']
    if 'humidity' in data: history.humidity = data['humidity']
    if 'pressure' in data: history.pressure = data['pressure']
    if 'wind_speed' in data: history.wind_speed = data['wind_speed']
    if 'weather' in data: history.weather = data['weather']
    if 'aqi' in data: history.aqi = data['aqi']

    db.session.commit()
    
    return jsonify(weather_history_schema.dump(history))

@history_bp.route('/history/<int:id>', methods=['DELETE'])
def delete_history(id):
    history = WeatherHistory.query.get_or_404(id)
    db.session.delete(history)
    db.session.commit()
    return '', 204

from flask import Response
from app.services.export_service import export_to_csv, export_to_json, export_to_pdf

@history_bp.route('/export/csv', methods=['GET'])
def export_csv():
    csv_data = export_to_csv()
    return Response(
        csv_data,
        mimetype="text/csv",
        headers={"Content-disposition": "attachment; filename=weather_history.csv"}
    )

@history_bp.route('/export/json', methods=['GET'])
def export_json():
    json_data = export_to_json()
    return Response(
        json_data,
        mimetype="application/json",
        headers={"Content-disposition": "attachment; filename=weather_history.json"}
    )

@history_bp.route('/export/pdf', methods=['GET'])
def export_pdf():
    pdf_data = export_to_pdf()
    return Response(
        pdf_data,
        mimetype="application/pdf",
        headers={"Content-disposition": "attachment; filename=weather_history.pdf"}
    )
