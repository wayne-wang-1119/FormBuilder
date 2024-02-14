from flask import Flask, jsonify, send_from_directory
from dotenv import load_dotenv
from flask import request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)


if __name__ == "__main__":
    app.run(debug=True)
