from flask import Blueprint, request, render_template, jsonify
from werkzeug.utils import secure_filename
import os
import requests
from openai import OpenAI 


main = Blueprint('main', __name__)

MODEL="gpt-4o"
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


@main.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        if file.filename == '':
            return 'No selected file'
        if file:
            filename = secure_filename(file.filename)
            filepath = (os.path.join('data/sample_images', filename))
            file.save(filepath)

            classification = classify_image(filepath)
            chat_response = get_chat_response(classification)

            return jsonify({"status": "file uploaded successfully"})
    return render_template('index.html')


def classify_image(image_path):
    with open(image_path, 'rb') as img_file:
        response = client.Image.create(
            file=img_file,
            model="gpt-4"
        )
    if response.get('status') == 200:
        return response['choices'][0]['text']
    else:
        return {"error": "Failed to classify image"}

