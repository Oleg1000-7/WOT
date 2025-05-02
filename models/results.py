from datetime import datetime

import sqlalchemy
from sqlalchemy.orm import relationship

from db.db import db
from flask_login import UserMixin

class Results(db.Model, UserMixin):
    __tablename__ = 'results'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    user_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"))
    months = sqlalchemy.Column(sqlalchemy.String)
    percents = sqlalchemy.Column(sqlalchemy.Integer)
    modified_date = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.now)

    user = relationship("User")
