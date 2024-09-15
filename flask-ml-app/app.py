import os
import subprocess
import pandas as pd
from flask import Flask, request, render_template, jsonify, send_file

app = Flask(__name__)

# Path to the CSV file
CSV_FILE_PATH = 'player_data.csv'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/fetch_data', methods=['POST'])
def fetch_data():
    player_id = request.form.get('player_id')
    if not player_id:
        return "Player ID is required", 400

    try:
        # Fetch player data and save to CSV
        subprocess.run(['python', 'fetch_and_save.py', player_id, CSV_FILE_PATH], check=True)

        # Read the CSV file
        if os.path.exists(CSV_FILE_PATH):
            df = pd.read_csv(CSV_FILE_PATH)
            data = df.to_dict(orient='records')
            return render_template('player_data.html', table=data)
        else:
            return jsonify({'error': 'Failed to fetch data'}), 500
     
    except subprocess.CalledProcessError as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download_csv', methods=['GET'])
def download_csv():
    if os.path.exists(CSV_FILE_PATH):
        return send_file(CSV_FILE_PATH, mimetype='text/csv', as_attachment=True, attachment_filename='player_data.csv')
    else:
        return jsonify({'error': 'CSV file does not exist'}), 404

@app.route('/predict', methods=['POST'])
def make_prediction():
    data = request.form.to_dict()
    try:
        # Convert input data to DataFrame
        df = pd.DataFrame([data])

        # Call the predict function from model.py
        from model.model import predict
        prediction = predict(df)
        
        return jsonify({'prediction': prediction})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
