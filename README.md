# Full Stack Weather Application

A responsive weather application where users can search for a location, view real-time weather information, and manage weather searches through a backend API with full CRUD functionality.

## Architecture

- Frontend: React 19, Vite, TypeScript, TailwindCSS, shadcn/ui.
- Backend: Flask, SQLAlchemy, SQLite, Marshmallow.
- APIs Used: OpenWeatherMap (Weather), OpenStreetMap Nominatim (Geocoding), Open-Meteo (Air Quality).

## Setup Instructions

 Prerequisites
- Node.js (v18+)
- Python (3.9+)

Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file based on `.env.example` and add your `OPENWEATHERMAP_API_KEY`.
6. Run the application: `python run.py`

Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
\Features
- Real-time weather data search by City, ZIP Code, or Coordinates.
- 5-Day Forecast and Temperature Trend.
- Interactive Map displaying the selected location.
- Air Quality Index (AQI) display.
- Search History with full CRUD capabilities.
- Export History to CSV, JSON, and PDF.
