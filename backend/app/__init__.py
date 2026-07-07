from flask import Flask
from flask_cors import CORS
from .config import Config
from .models import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app)
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
        
    # Register blueprints
    from .routes.weather import weather_bp
    from .routes.history import history_bp
    
    app.register_blueprint(weather_bp, url_prefix='/api')
    app.register_blueprint(history_bp, url_prefix='/api')
    
    @app.route('/health')
    def health_check():
        return {'status': 'ok'}
        
    return app
