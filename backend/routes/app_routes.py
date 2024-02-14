import time
from models import db, Form
import json
from services import generate_response
import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import openai
from dotenv import load_dotenv
import html2text

# from services.weaviate import client
from services import rag_chain

load_dotenv()

bp = Blueprint("form_routes", __name__)

openai.api_key = os.getenv("OPENAI_API_KEY")


def configure_routes(app):
    app.register_blueprint(bp)


@bp.route("/forms", methods=["POST"])
def create_form():
    form_data = request.json
    form_id = secure_filename(f"form_{int(time.time())}")  # Simple ID generation
    db_folder = "db"
    if not os.path.exists(db_folder):
        os.makedirs(db_folder)
    file_path = os.path.join(db_folder, f"{form_id}.json")
    with open(file_path, "w") as file:
        json.dump(form_data, file)

    ##set up RAG here
    responses = {}
    for question in form_data.get("input", []):
        prompt = f"Based on the content {question['description']} what is the answer?\nAnswer the question: {question['title']}"
        response = rag_chain.invoke(prompt)
        responses[question["title"]] = response

    for question in form_data.get("radio", []):
        prompt = f"Based on the content {question['options']} and the selected options {question['selectedOption']} what is the answer?\nAnswer the question: {question['groupName']}"
        response = rag_chain.invoke(prompt)
        responses[question["groupName"]] = response

    for question in form_data.get("checkbox", []):
        prompt = f"Based on the {question['label']} being selected as {question['value']} what is the answer?\nAnswer the question"
        response = rag_chain.invoke(prompt)
        responses[question["label"]] = response

    return jsonify({"success": True, "form_id": form_id, "response": responses}), 200


@bp.route("/process/forms/<form_id>", methods=["GET"])
def process_form(form_id):
    file_path = os.path.join("db", f"{form_id}.json")
    if not os.path.exists(file_path):
        return jsonify({"error": "Form not found"}), 404
    with open(file_path, "r") as file:
        form_data = json.load(file)
    response = generate_response(form_data)
    return jsonify({"response": response})
