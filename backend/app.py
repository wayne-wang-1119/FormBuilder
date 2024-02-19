from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db
from routes import configure_routes
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

configure_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
