from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    @app.route('/health')
    def health_check():
        return {'status': 'ok'}
        
    return app
