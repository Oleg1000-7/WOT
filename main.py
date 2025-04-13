from flask import Flask, render_template, request
from flask_restful import Api

from models.events import Events
from resources.event_resource import EventResource, EventsListResource

from db.db import *
import os

app = Flask(__name__)
file_path = os.path.abspath(os.getcwd()) + "/db/database.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + file_path

db.init_app(app)

with app.app_context():
    db.create_all()

api = Api(app)
api.add_resource(EventsListResource, '/api/v2/events')
api.add_resource(EventResource, '/api/v2/events/<int:event_id>')

@app.route("/")
@app.route("/index")
def index():
    if request.method == "GET":
        return render_template("index.html")
    else:
        return {"status": "ok"}


@app.route("/check")
def check():
    return render_template("check.html")


@app.route("/contacts")
def contacts():
    return render_template("contacts.html")


@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True)
