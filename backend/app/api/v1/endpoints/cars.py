from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.models.car import Car, CarCategory

router = APIRouter()

@router.get("/")
async def list_cars(
    location:  Optional[str]         = Query(None),
    category:  Optional[CarCategory] = Query(None),
    min_price: Optional[float]       = Query(None),
    max_price: Optional[float]       = Query(None),
    available: bool                  = Query(True),
    page:      int                   = Query(1, ge=1),
    limit:     int                   = Query(20, ge=1, le=100),
    db:        Session               = Depends(get_db),
):
    query = db.query(Car)
    if available:
        query = query.filter(Car.is_available == True)
    if location:
        query = query.filter(Car.location.ilike(f"%{location}%"))
    if category:
        query = query.filter(Car.category == category)
    if min_price is not None:
        query = query.filter(Car.price_per_day >= min_price)
    if max_price is not None:
        query = query.filter(Car.price_per_day <= max_price)
    total = query.count()
    cars  = query.offset((page - 1) * limit).limit(limit).all()
    return {"total": total, "page": page, "limit": limit, "cars": cars}

@router.get("/{car_id}")
async def get_car(car_id: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car
