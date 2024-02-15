from langchain_community.document_loaders import UnstructuredHTMLLoader
import os
from werkzeug.utils import secure_filename
from flask import json


def form_creator(request):
    """
    reads in content from a request and parse it correctly and store it as data
    """
    form_data = request.json
    form_id = secure_filename(f"form_{int(time.time())}")  # Simple ID generation
    db_folder = "db"
    if not os.path.exists(db_folder):
        os.makedirs(db_folder)
    file_path = os.path.join(db_folder, f"{form_id}.json")
    with open(file_path, "w") as file:
        json.dump(form_data, file)

    return form_data, form_id, db_folder
