from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import auth, cars, bookings, payments, users

app = FastAPI(
    title="DriveEase API",
    description="Car Rental Platform API - European Markets",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/api/v1/auth",     tags=["Authentication"])
app.include_router(cars.router,     prefix="/api/v1/cars",     tags=["Cars"])
app.include_router(bookings.router, prefix="/api/v1/bookings", tags=["Bookings"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])
app.include_router(users.router,    prefix="/api/v1/users",    tags=["Users"])

@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "service": "DriveEase API", "version": "1.0.0"}

@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}
