import requests
from flask import current_app

def geocode_location(location):
    url = f"https://nominatim.openstreetmap.org/search"
    params = {
        'q': location,
        'format': 'json',
        'limit': 1
    }
    headers = {
        'User-Agent': 'WeatherApp/1.0 (test@example.com)'
    }
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200 and response.json():
        data = response.json()[0]
        return float(data['lat']), float(data['lon']), data.get('display_name')
    return None, None, None

def get_current_weather(lat, lon):
    api_key = current_app.config.get('OPENWEATHERMAP_API_KEY')
    if not api_key or api_key == 'your_api_key_here':
        # Fallback or error if no key
        raise Exception("OpenWeatherMap API Key is not configured")
        
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        'lat': lat,
        'lon': lon,
        'appid': api_key,
        'units': 'metric'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    raise Exception(f"OpenWeatherMap API error: {response.text}")

def get_forecast(lat, lon):
    api_key = current_app.config.get('OPENWEATHERMAP_API_KEY')
    if not api_key or api_key == 'your_api_key_here':
        raise Exception("OpenWeatherMap API Key is not configured")
        
    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        'lat': lat,
        'lon': lon,
        'appid': api_key,
        'units': 'metric'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    raise Exception(f"OpenWeatherMap API error: {response.text}")

def get_aqi(lat, lon):
    url = "https://air-quality-api.open-meteo.com/v1/air-quality"
    params = {
        'latitude': lat,
        'longitude': lon,
        'current': 'us_aqi'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        return data.get('current', {}).get('us_aqi')
    return None

def fetch_weather_data(location):
    lat, lon, display_name = geocode_location(location)
    if lat is None or lon is None:
        raise ValueError(f"Could not find coordinates for location: {location}")
        
    weather_data = get_current_weather(lat, lon)
    forecast_data = get_forecast(lat, lon)
    aqi_data = get_aqi(lat, lon)
    
    return {
        'location': display_name or location,
        'latitude': lat,
        'longitude': lon,
        'current': weather_data,
        'forecast': forecast_data,
        'aqi': aqi_data
    }
