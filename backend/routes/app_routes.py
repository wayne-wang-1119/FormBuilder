import time
from models import db, Form
import json
from services import generate_response, generate_pdf
import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import openai
from dotenv import load_dotenv
import html2text
from flask import send_from_directory

# from services.weaviate import client
from services import rag_chain, qa_chain

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

    print(form_data)
    ##set up RAG here
    responses = {}
    # Process "input" type questions
    for question in form_data.get("input", []):
        prompt = f"Based on the content {question['description']} what is the answer?\nAnswer the question: {question['title']}"
        response = qa_chain({"query": prompt})["result"]
        responses[question["title"]] = {
            "description": question["description"],
            "response": response,
        }

    # Process "radio" type questions
    radio_responses = []
    for question in form_data.get("radio", []):
        prompt = f"Based on the content {question['question']} being asked, the options available are {question['options']} and the selected option is {question['selectedOption']} what is the right answer?\nAnswer the question only using options from: {question['options']}, do not answer any options outside of these options. If not applicable, respond with any one from the list. Return only the option you choose."
        response = qa_chain({"query": prompt})["result"]
        if response.endswith("."):
            response = response[:-1]
        # Assuming response is one of the options or a new option
        updated_options = (
            question["options"]
            if response in question["options"]
            else question["options"] + [response]
        )
        radio_responses.append(
            {
                "question": question["question"],
                "options": updated_options,
                "selectedOption": response,
            }
        )

    # Process "checkbox" type questions
    checkbox_responses = []
    for question in form_data.get("checkbox", []):
        prompt = f"Based on the question: {question['question']} with the total options {question['options']}, which ones are the right answers?\nAnswer the question only using options from {question['options']}, do not answer any options outside of these options. Do not answer in a sentence, answer only options seperated with a comma and end with a comma. Example: Knowldge, Business, /End of example.If not applicable, respond with any one from the list. Return only the options you choose."
        response = qa_chain({"query": prompt})["result"]
        response = [
            option.strip() for option in response.split(",")
        ]  # Split and trim each option

        updated_options = question["options"]
        selected_options = []

        for option in response:
            if (
                option and option not in updated_options
            ):  # Check if option is not already in the list
                updated_options.append(option)
            if option:  # Add to selected options if it's a valid, non-empty string
                selected_options.append(option)

        checkbox_responses.append(
            {
                "question": question["question"],
                "options": updated_options,  # Use the updated options list
                "selectedOptions": selected_options,
            }
        )

    # Combine processed questions into a single response structure
    final_responses = {
        "input": responses,  # Adjust according to how you want to structure this
        "radio": radio_responses,
        "checkbox": checkbox_responses,
    }

    pdf_file_path = os.path.join(db_folder, f"{form_id}.pdf")
    generate_pdf(final_responses, pdf_file_path)

    print(final_responses)

    return (
        jsonify({"success": True, "form_id": form_id, "response": final_responses}),
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
