# backend/main.py
import secrets
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware # To allow our Next.js app to talk to this API
from sqlalchemy.orm import Session
from pydantic import BaseModel

import models
import database  


# Create the database tables
database.create_db_and_tables()

app = FastAPI()

# --- CORS Middleware ---
# This is crucial for allowing your Next.js frontend to make requests to this backend
origins = [
    "http://localhost:3000",  # The default Next.js dev server port
    # Add your production frontend URL here later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request/Response validation ---
class URLBase(BaseModel):
    long_url: str

class URLInfo(URLBase):
    short_code: str
    clicks: int

# --- Dependency to get DB session ---
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- API Endpoints ---
@app.post("/shorten", response_model=URLInfo)
def create_short_url(url: URLBase, db: Session = Depends(get_db)):
    # Generate a unique short code
    short_code = secrets.token_urlsafe(6)
    
    # Create the database record
    db_url = models.URL(long_url=url.long_url, short_code=short_code)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    
    return db_url

@app.get("/{short_code}")
def redirect_to_long_url(short_code: str, db: Session = Depends(get_db)):
    db_url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    
    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")
    
    # Track clicks
    db_url.clicks += 1
    db.commit()
    
    # Redirect the user
    return RedirectResponse(url=db_url.long_url, status_code=307)