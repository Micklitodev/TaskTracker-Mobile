from flask import Flask
from flask_cors import CORS
from routes.main import main_routes
from database.database import db

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///your_database.db"

with app.app_context():
    db.init_app(app)
    db.create_all()

app.register_blueprint(main_routes)

if __name__ == "__main__":
    app.run()
