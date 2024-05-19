from flask import Blueprint, request, render_template, jsonify
from werkzeug.utils import secure_filename
import os
import requests
import openai
import base64

main = Blueprint('main', __name__)

# Input the API Key here
api_key = os.environ.get('OPENAI_API_KEY')


@main.route('/')
def startSite():
    return render_template('index.html')


@main.route('/send', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file part', 400
        file = request.files['file']
        if file.filename == '':
            return 'No selected file', 400
        if file:
            filename = secure_filename(file.filename)
            filepath = os.path.join('data/sample_images', filename)
            file.save(filepath)

            classification = classify_image(filepath)
            chat_response = get_chat_response(classification)

            return jsonify({
                "status": "file uploaded successfully",
                "classification": classification,
                "chat_response": chat_response
            })
    return render_template('index.html')


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def classify_image(image_path):
    base64_image = encode_image(image_path)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What’s in this image and which trash container does this go into? If the image is not something you can throw away, say it so"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content']
    else:
        return {"error": "Failed to classify image"}


def get_chat_response(classification):
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are EcoSort, an intelligent waste sorting machine. "
                                          "You classify waste as either garbage, recycle, compost, or cardboard bins."
                                          " Your response will be formatted simply as 'This item goes into the"
                                          " (landfill bin/recycle bin/compost bin/mixed papers bin).'"
                                          " If the image cannot logically or reasonably be thrown away in any of these,"
                                          " Say the image is not applicable."},
            {"role": "user", "content":
                f"Please provide information about the following waste classification: {classification}"}
        ]
    )
    return response.choices[0].message.content


@main.route('/error')
def send_error_page():
    return render_template("error.html")
