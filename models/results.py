from datetime import datetime

import sqlalchemy
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin

from db.db import db


class Results(db.Model, SerializerMixin):
    __tablename__ = 'results'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"))
    months = sqlalchemy.Column(sqlalchemy.String)
    percents = sqlalchemy.Column(sqlalchemy.Integer)
    modified_date = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.now)

    user = relationship("User")
