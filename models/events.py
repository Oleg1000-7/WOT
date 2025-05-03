import sqlalchemy
from sqlalchemy_serializer import SerializerMixin

from db.db import db


class Events(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    month_number = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    event_description = sqlalchemy.Column(sqlalchemy.String, nullable=False)
