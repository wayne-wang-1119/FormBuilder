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


if __name__ == "__main__":
    app.run(debug=True)
