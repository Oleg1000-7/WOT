from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy_serializer import SerializerMixin

from db.db import db, Base


class Events(db.Model, SerializerMixin):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)
    month_number: Mapped[int] = mapped_column(nullable=False)
    event_description: Mapped[str] = mapped_column(nullable=False)
