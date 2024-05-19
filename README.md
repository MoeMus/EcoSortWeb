
EcoSort - The easy solution to sort your waste

Upload an image of any waste to the website, and it will return information about where to dispose of it, i.e, which bin to put it

You need to input your OpenAI API key as the 'api_key' variable in routes.py, as well as setting it as an environment variable using "export OPENAI_API_KEY=VALUE" in the terminal


To start the project, make sure that you have the Python libraries flask (3.0.3), werkzeug (3.0.3), tensorflow (2.16.1), requests (2.31.0), openai (1.30.1) installed

To run the project, go the the directory which the repo is located and enter "gunicorn -w 4 -b 0.0.0.0:8727 wsgi:app" in the root directory on the terminal to start the development server on port 8727, then go to the URL
