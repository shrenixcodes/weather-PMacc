import csv
import json
import io
from app.models import WeatherHistory
from app.schemas import weather_histories_schema
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

def export_to_csv():
    histories = WeatherHistory.query.order_by(WeatherHistory.created_at.desc()).all()
    data = weather_histories_schema.dump(histories)
    
    output = io.StringIO()
    if not data:
        return output.getvalue()
        
    writer = csv.DictWriter(output, fieldnames=data[0].keys())
    writer.writeheader()
    for row in data:
        writer.writerow(row)
        
    return output.getvalue()

def export_to_json():
    histories = WeatherHistory.query.order_by(WeatherHistory.created_at.desc()).all()
    data = weather_histories_schema.dump(histories)
    return json.dumps(data, indent=2)

def export_to_pdf():
    histories = WeatherHistory.query.order_by(WeatherHistory.created_at.desc()).all()
    data = weather_histories_schema.dump(histories)
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=18)
    
    elements = []
    styles = getSampleStyleSheet()
    elements.append(Paragraph("Weather Search History", styles['Heading1']))
    
    if not data:
        elements.append(Paragraph("No history found.", styles['Normal']))
    else:
        # Create Table Data
        # We'll pick a few key columns to fit on the page
        headers = ['Location', 'Temp (°C)', 'Weather', 'AQI', 'Date']
        table_data = [headers]
        
        for row in data:
            date_str = row.get('created_at', '')[:10]
            table_data.append([
                str(row.get('location', '')),
                str(row.get('temperature', '')),
                str(row.get('weather', '')),
                str(row.get('aqi', '')),
                date_str
            ])
            
        t = Table(table_data)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        elements.append(t)
        
    doc.build(elements)
    buffer.seek(0)
    return buffer.getvalue()
