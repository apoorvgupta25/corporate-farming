# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, redirect, url_for, jsonify, request
import numpy as np
import pickle

# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)




# Loading crop prediction model

crop_prediction_model_path = 'RandomForest.pkl'
crop_prediction_model = pickle.load(
    open(crop_prediction_model_path, 'rb'))
# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
	return 'Hello World'

@app.route('/success/<prediction>')
def success(prediction):
    return jsonify({'prediction': prediction})
    #return 'crop predicted is %s' %prediction

@app.route('/crop_prediction')
def crop_prediction():
    title = 'Harvestify - Crop prediction'

    if request.method == 'GET':
        N = int(request.args.get('nitrogen', ''))
        P = int(request.args.get('phosphorous', ''))
        K = int(request.args.get('pottasium',''))
        ph = float(request.args.get('ph',''))
        rainfall = float(request.args.get('rainfall',''))
        temperature = float(request.args.get('temperature',''))
        humidity = float(request.args.get('humidity',''))

        data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        my_prediction = crop_prediction_model.predict(data)
        final_prediction = my_prediction[0]
        response = jsonify({'prediction': final_prediction})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    # response.headers.add('Access-Control-Allow-Origin', '*')
        #return redirect(url_for('success',prediction=final_prediction))
        # return jsonify({'prediction': final_prediction})

   
# main driver function
if __name__ == '__main__':

	# run() method of Flask class runs the application
	# on the local development server.
	app.run()
