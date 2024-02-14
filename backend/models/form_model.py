from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Form(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.JSON)  # Store form data as JSON
