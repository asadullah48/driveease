from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id              = Column(Integer, primary_key=True, index=True)
    full_name       = Column(String(100), nullable=False)
    email           = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    phone           = Column(String(20))
    country         = Column(String(60))
    license_number  = Column(String(50))
    is_active       = Column(Boolean, default=True)
    is_verified     = Column(Boolean, default=False)
    created_at      = Column(DateTime, default=datetime.utcnow)

    bookings = relationship("Booking", back_populates="user")
