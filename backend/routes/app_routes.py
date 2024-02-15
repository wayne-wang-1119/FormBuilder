import time
from models import db, Form
import json
from services import generate_response, generate_pdf, form_creator
import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import openai
from dotenv import load_dotenv
import html2text
from flask import send_from_directory
from services import process_form

# from services.weaviate import client
from services import rag_chain, qa_chain

load_dotenv()

bp = Blueprint("form_routes", __name__)

openai.api_key = os.getenv("OPENAI_API_KEY")


def configure_routes(app):
    app.register_blueprint(bp)


@bp.route("/forms", methods=["POST"])
def create_form():
    form_data, form_id, db_folder = form_creator(request=request)
    print(form_data)
    responses = process_form(form_data)

    pdf_file_path = os.path.join(db_folder, f"{form_id}.pdf")
    generate_pdf(responses, pdf_file_path)

    print(responses)

    return (
        jsonify({"success": True, "form_id": form_id, "response": responses}),
        200,
    )


@bp.route("/process/forms/<form_id>", methods=["GET"])
def process_form(form_id):
    file_path = os.path.join("db", f"{form_id}.json")
    if not os.path.exists(file_path):
        return jsonify({"error": "Form not found"}), 404
    with open(file_path, "r") as file:
        form_data = json.load(file)
    response = generate_response(form_data)
    return jsonify({"response": response})


@bp.route("/download-pdf/<form_id>", methods=["GET"])
def download_pdf(form_id):
    pdf_folder = "db"
    pdf_file_name = f"{form_id}.pdf"
    print(pdf_file_name)
    print(os.getcwd())
    try:
        return send_from_directory(
            directory=pdf_folder,
            path=pdf_file_name,
            as_attachment=True,
            download_name=pdf_file_name,
        )
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
