from flask import Flask, render_template, request, jsonify
from joblib import load
import os
import pandas as pd
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS with credentials support

# Load the pre-trained linear regression model
model = load('linear_regression_model.joblib')
encoder = load('one_hot_encoder.joblib')

@app.route('/predict', methods=['POST'])
@cross_origin(supports_credentials=True)
def predict():
    try:
       # Get input data from the request
        data = request.get_json()

        # Create a DataFrame from the input data
        new_df = pd.DataFrame(data, index=[0])

        # One-hot encode categorical columns using the loaded encoder
        features_encoded = encoder.transform(new_df[['Sex', 'ChestPainType', 'RestingECG', 'ExerciseAngina', 'ST_Slope']])
        # Convert the encoded result to a DataFrame
        feature_labels = ['F', 'M' ,'ASY', 'ATA' ,'NAP', 'TA' ,'LVH' ,'Normal', 'ST' ,'N' ,'Y' ,'Down' ,'Flat', 'Up']
        new_df = new_df.drop(["Sex", "ChestPainType", "RestingECG", "ExerciseAngina", "ST_Slope"], axis=1)
        print(new_df)
        print(features_encoded)
        new_df_new = pd.concat([new_df, pd.DataFrame(features_encoded.toarray(), columns = feature_labels)] , axis=1)

        # Make predictions on the preprocessed input data
        predictions = model.predict(new_df_new)

        # Return the predictions as JSON
        return jsonify({'predictions': predictions.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=10000)


# Rest of your Flask app code..