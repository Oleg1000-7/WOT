import datetime

from flask import jsonify
from flask_restful import abort, Resource
from db.db import db
from models.events import Events


class EventResource(Resource):
    def get(self, event_date):
        events = db.session.query(Events).filter(Events.month_number == event_date).all()
        return jsonify({'event': [item.to_dict(
            only=('event_description',)) for item in events]})


class EventsListResource(Resource):
    def get(self, borders: tuple[datetime.datetime, datetime.datetime] | None = None):
        if borders:
            events = db.session.execute(db.select(Events).where(borders[1] <= Events.date <= borders[2])).scalars()
        else:
            events = db.session.execute(db.select(Events)).scalars()
        return jsonify({'events': [item.to_dict(
            only=('month_number', 'event_description')) for item in events]})
