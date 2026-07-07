# Full Stack Weather Application

A responsive weather application where users can search for a location, view real-time weather information, and manage weather searches through a backend API with full CRUD functionality.

## Architecture

- Frontend: React 19, Vite, TypeScript, TailwindCSS, shadcn/ui.
- Backend: Flask, SQLAlchemy, SQLite, Marshmallow.
- APIs Used: OpenWeatherMap (Weather), OpenStreetMap Nominatim (Geocoding), Open-Meteo (Air Quality).

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- OpenWeatherMap API Key

### Backend Setup
1. Navigate to the `backend` directory: 
   ```bash
   cd backend
   ```
2. Create a virtual environment: 
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: 
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file based on `.env.example` and add your `OPENWEATHERMAP_API_KEY`.
6. Run the Flask development server: 
   ```bash
   python run.py
   ```
   The backend will start on `http://localhost:5000` (by default).

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory: 
   ```bash
   cd frontend
   ```
2. Install dependencies: 
   ```bash
   npm install
   ```
3. Run the development server: 
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

## Features Implemented
- **Weather Search**: Real-time weather data search by City, ZIP Code, or Coordinates.
- **Current Weather**: Displays Temperature, Feels Like, Weather Condition, Humidity, Wind Speed, Pressure, Visibility.
- **5-Day Forecast & Temperature Trend**: Uses `recharts` for an interactive line chart.
- **Interactive Map**: Uses `react-leaflet` to display the selected location on a map.
- **Air Quality Index (AQI)**: Displays AQI with corresponding health indicators.
- **Search History**: Full CRUD capabilities implemented via SQLite and Flask backend.
- **Export Data**: Export History to CSV, JSON, and PDF (via `reportlab`).
