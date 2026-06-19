from sqlalchemy import Column, Integer, String, Float, Boolean, Enum, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime
import enum

class BookingStatus(str, enum.Enum):
    PENDING    = "pending"
    CONFIRMED  = "confirmed"
    ACTIVE     = "active"
    COMPLETED  = "completed"
    CANCELLED  = "cancelled"

class Booking(Base):
    __tablename__ = "bookings"

    id              = Column(Integer, primary_key=True, index=True)
    user_id         = Column(Integer, ForeignKey("users.id"), nullable=False)
    car_id          = Column(Integer, ForeignKey("cars.id"), nullable=False)
    pickup_date     = Column(DateTime, nullable=False)
    return_date     = Column(DateTime, nullable=False)
    pickup_location = Column(String(150), nullable=False)
    return_location = Column(String(150), nullable=False)
    total_days      = Column(Integer, nullable=False)
    total_price     = Column(Float, nullable=False)
    status          = Column(Enum(BookingStatus), default=BookingStatus.PENDING)
    stripe_payment_id = Column(String(200))
    notes           = Column(Text)
    created_at      = Column(DateTime, default=datetime.utcnow)
    updated_at      = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="bookings")
    car  = relationship("Car", back_populates="bookings")
