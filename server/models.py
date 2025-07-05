# backend/models.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class URL(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True)
    # Add a max length for MySQL compatibility
    short_code = Column(String(20), unique=True, index=True)
    long_url = Column(String(2048), index=True) # 2048 is a generous standard
    clicks = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)