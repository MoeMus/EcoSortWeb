from flask import Blueprint, request, render_template, jsonify
from werkzeug.utils import secure_filename
import os

main = Blueprint('main', __name__)


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
            file.save(os.path.join('data/sample_images', filename))

            return jsonify({"status": "file uploaded successfully"})
    return render_template('index.html')
