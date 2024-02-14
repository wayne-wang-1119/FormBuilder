from flask import Flask, jsonify, send_from_directory
from dotenv import load_dotenv
from flask import request
from flask_cors import CORS
import os
import openai as OpenAI

load_dotenv()
OpenAI.api_key = os.getenv("OPENAI_API_KEY")


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/forms")
def create_form():
    return jsonify({"success": "creation success"}), 200


@app.route("/update/forms/{formId}")
def update_form():
    return "form updated"


@app.route("/view/forms/{formId}")
def view_forms():
    return "viewiing forms"


if __name__ == "__main__":
    app.run(debug=True)
