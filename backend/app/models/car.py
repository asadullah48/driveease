from sqlalchemy import Column, Integer, String, Float, Boolean, Enum, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class CarCategory(str, enum.Enum):
    ECONOMY    = "economy"
    COMPACT    = "compact"
    SUV        = "suv"
    LUXURY     = "luxury"
    VAN        = "van"
    ELECTRIC   = "electric"

class TransmissionType(str, enum.Enum):
    AUTOMATIC = "automatic"
    MANUAL    = "manual"

class Car(Base):
    __tablename__ = "cars"

    id              = Column(Integer, primary_key=True, index=True)
    name            = Column(String(100), nullable=False)
    brand           = Column(String(50), nullable=False)
    model           = Column(String(50), nullable=False)
    year            = Column(Integer, nullable=False)
    category        = Column(Enum(CarCategory), nullable=False)
    transmission    = Column(Enum(TransmissionType), nullable=False)
    seats           = Column(Integer, nullable=False)
    price_per_day   = Column(Float, nullable=False)
    location        = Column(String(100), nullable=False)
    latitude        = Column(Float)
    longitude       = Column(Float)
    image_url       = Column(String(500))
    description     = Column(Text)
    is_available    = Column(Boolean, default=True)
    rating          = Column(Float, default=0.0)
    total_reviews   = Column(Integer, default=0)
    fuel_type       = Column(String(30))
    features        = Column(Text)

    bookings = relationship("Booking", back_populates="car")
