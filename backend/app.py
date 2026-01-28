from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import MONGO_URI

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = MONGO_URI

mongo = PyMongo(app)

@app.route("/")
def home():
    return {"message": "Placement Portal Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)

