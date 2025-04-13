import datetime

from flask import jsonify
from flask_restful import abort, Resource
from db.db import db
from models.events import Events


def abort_if_news_not_found(event_id):
    news = db.session.get(Events, event_id)
    if not news:
        abort(404, message=f"Event with id = {event_id} not found")


class EventResource(Resource):
    def get(self, event_id):
        abort_if_news_not_found(event_id)
        events = db.session.get(Events, event_id)
        return jsonify({'news': events.to_dict(
            only=('month_number', 'event_description'))})


class EventsListResource(Resource):
    def get(self, borders: tuple[datetime.datetime, datetime.datetime] | None = None):
        if borders:
            events = db.session.execute(db.select(Events).where(borders[1] <= Events.date <= borders[2])).scalars()
        else:
            events = db.session.execute(db.select(Events)).scalars()
        return jsonify({'events': [item.to_dict(
            only=('month_number', 'event_description')) for item in events]})
