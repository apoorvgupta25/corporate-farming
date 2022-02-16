# importing the requests library
import requests

# api-endpoint
URL = "http://127.0.0.1:5000/crop_prediction"



# defining a params dict for the parameters to be sent to the API
PARAMS = {'nitrogen':66,'phosphorous':44, 'pottasium':20, 'ph':6.5, 'rainfall':80, 'humidity': 69, 'temperature': 19}


# sending get request and saving the response as response object
r = requests.get(url = URL, params = PARAMS)

# extracting data in json format
data = r.json()


# extracting latitude, longitude and formatted address
# of the first matching location
prediction = data['prediction']

# printing the output
print("prediction:%s"
	%prediction)
