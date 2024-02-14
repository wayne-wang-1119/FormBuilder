from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db
from routes import configure_routes
import os

app = Flask(__name__)
CORS(app)

# database_path = os.path.join(os.getcwd(), "db", "forms.db")
# if not os.path.exists(database_path):
#     os.makedirs(database_path)
# app.config["SQLALCHEMY_DATABASE_URI"] = (
#     f'sqlite:///{os.path.join(database_path, "database.db")}'
# )


# db.init_app(app)

# with app.app_context():
#     db.create_all()

configure_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
