from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from geopy.distance import geodesic
import openai
import os

app = Flask(__name__)
CORS(app)

# Load pre-trained models (these would be trained and saved separately)
try:
    price_model = joblib.load('price_model.pkl')
    recommend_model = joblib.load('recommend_model.pkl')
    fraud_model = joblib.load('fraud_model.pkl')
    eta_model = joblib.load('eta_model.pkl')
except FileNotFoundError:
    print("Warning: Model files not found. Using dummy models for demonstration.")
    price_model = None
    recommend_model = None
    fraud_model = None
    eta_model = None

# Configure OpenAI API
openai.api_key = os.getenv('OPENAI_API_KEY', 'your-api-key-here')

@app.route('/')
def home():
    return jsonify({
        "message": "AURA ML Service",
        "version": "1.0.0",
        "description": "Machine Learning microservice for AURA Unified Marketplace"
    })

@app.route('/price', methods=['POST'])
def predict_price():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "No data provided"}), 400
            
        # In a real implementation, this would use the trained model
        # For now, we'll return a dummy prediction
        predicted_price = 99.99
        confidence = 0.85
        
        return jsonify({
            "predicted_price": predicted_price,
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommend', methods=['POST'])
def recommend_products():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "No data provided"}), 400
            
        # In a real implementation, this would use the trained model
        # For now, we'll return dummy recommendations
        recommendations = [
            {"id": 1, "name": "Recommended Product 1", "similarity_score": 0.95},
            {"id": 2, "name": "Recommended Product 2", "similarity_score": 0.87},
            {"id": 3, "name": "Recommended Product 3", "similarity_score": 0.82}
        ]
        
        return jsonify({
            "recommendations": recommendations
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/fraud-detect', methods=['POST'])
def detect_fraud():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "No data provided"}), 400
            
        # In a real implementation, this would use the trained model
        # For now, we'll return a dummy result
        is_fraud = False
        risk_score = 0.1
        
        return jsonify({
            "is_fraud": is_fraud,
            "risk_score": risk_score
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/eta', methods=['POST'])
def predict_eta():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "No data provided"}), 400
            
        distance_km = data.get('distance_km', 100)
        traffic = data.get('traffic', 'moderate')
        weather = data.get('weather', 'clear')
        
        # Simple ETA calculation based on distance and conditions
        # In a real implementation, this would use the trained model
        base_speed = 60  # km/h
        
        if traffic == 'heavy':
            base_speed *= 0.6
        elif traffic == 'light':
            base_speed *= 1.2
            
        if weather == 'rainy':
            base_speed *= 0.8
        elif weather == 'snowy':
            base_speed *= 0.5
            
        eta_hours = distance_km / base_speed
        
        return jsonify({
            "eta_hours": round(eta_hours, 2),
            "distance_km": distance_km,
            "traffic": traffic,
            "weather": weather
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/optimize-route', methods=['POST'])
def optimize_route():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "No data provided"}), 400
            
        origin = data.get('origin', (0, 0))
        destination = data.get('destination', (100, 100))
        traffic = data.get('traffic', 'moderate')
        weather = data.get('weather', 'clear')
        
        # Calculate distance
        distance = geodesic(origin, destination).kilometers
        
        # Simple route optimization
        # In a real implementation, this would use a more sophisticated algorithm
        route = [origin, destination]
        
        # Calculate ETA
        base_speed = 60  # km/h
        
        if traffic == 'heavy':
            base_speed *= 0.6
        elif traffic == 'light':
            base_speed *= 1.2
            
        if weather == 'rainy':
            base_speed *= 0.8
        elif weather == 'snowy':
            base_speed *= 0.5
            
        eta_hours = distance / base_speed
        risk_level = "low" if traffic == "light" else "medium" if traffic == "moderate" else "high"
        
        recommendation = f"Optimal route with {traffic} traffic and {weather} weather conditions."
        
        return jsonify({
            "route": route,
            "eta_hours": round(eta_hours, 2),
            "risk_level": risk_level,
            "recommendation": recommendation,
            "distance_km": round(distance, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-description', methods=['POST'])
def generate_description():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "No data provided"}), 400
            
        product_info = data.get('product_info', {})
        
        # In a real implementation, this would use OpenAI API
        # For now, we'll return a dummy description
        description = f"High-quality {product_info.get('name', 'product')} in {product_info.get('color', 'various')} color. Perfect for {product_info.get('use_case', 'daily use')}."
        
        return jsonify({
            "description": description
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)