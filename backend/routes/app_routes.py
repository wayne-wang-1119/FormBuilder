import time
from models import db, Form
import json
from services import generate_response
import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

bp = Blueprint("form_routes", __name__)


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
    return jsonify({"success": True, "form_id": form_id}), 200


@bp.route("/process/forms/<form_id>", methods=["GET"])
def process_form(form_id):
    file_path = os.path.join("db", f"{form_id}.json")
    if not os.path.exists(file_path):
        return jsonify({"error": "Form not found"}), 404
    with open(file_path, "r") as file:
        form_data = json.load(file)
    response = generate_response(
        form_data
    )  # Assuming this function is adapted to process JSON directly
    return jsonify({"response": response})
