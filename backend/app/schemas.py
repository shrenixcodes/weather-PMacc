from marshmallow import Schema, fields, validate, validates, ValidationError

class WeatherHistorySchema(Schema):
    id = fields.Int(dump_only=True)
    location = fields.Str(required=True, validate=validate.Length(min=1))
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    start_date = fields.Str(allow_none=True)
    end_date = fields.Str(allow_none=True)
    temperature = fields.Float(required=True)
    humidity = fields.Int(required=True)
    pressure = fields.Int(required=True)
    wind_speed = fields.Float(required=True)
    weather = fields.Str(required=True)
    aqi = fields.Int(allow_none=True)
    created_at = fields.DateTime(dump_only=True)

    @validates("latitude")
    def validate_latitude(self, value):
        if value < -90 or value > 90:
            raise ValidationError("Latitude must be between -90 and 90.")

    @validates("longitude")
    def validate_longitude(self, value):
        if value < -180 or value > 180:
            raise ValidationError("Longitude must be between -180 and 180.")

weather_history_schema = WeatherHistorySchema()
weather_histories_schema = WeatherHistorySchema(many=True)
