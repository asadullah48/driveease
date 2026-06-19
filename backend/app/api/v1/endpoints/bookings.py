from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.booking import Booking, BookingStatus
from app.models.car import Car
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class BookingRequest(BaseModel):
    car_id:          int
    user_id:         int
    pickup_date:     datetime
    return_date:     datetime
    pickup_location: str
    return_location: str

@router.post("/", status_code=201)
async def create_booking(payload: BookingRequest, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == payload.car_id, Car.is_available == True).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not available")
    days = (payload.return_date - payload.pickup_date).days
    if days < 1:
        raise HTTPException(status_code=400, detail="Minimum booking is 1 day")
    booking = Booking(
        user_id=payload.user_id,
        car_id=payload.car_id,
        pickup_date=payload.pickup_date,
        return_date=payload.return_date,
        pickup_location=payload.pickup_location,
        return_location=payload.return_location,
        total_days=days,
        total_price=round(days * car.price_per_day, 2),
        status=BookingStatus.PENDING,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

@router.get("/{booking_id}")
async def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.put("/{booking_id}/cancel")
async def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = BookingStatus.CANCELLED
    db.commit()
    return {"message": "Booking cancelled", "booking_id": booking_id}
