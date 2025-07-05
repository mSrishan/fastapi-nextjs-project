# backend/database.py
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
# This is the corrected version
from models import Base

# This line loads the variables from your .env file
load_dotenv()

# Read the credentials from the environment
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# The connection string for MySQL using the PyMySQL driver
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# The SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# The session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_db_and_tables():
    # This will command SQLAlchemy to create all tables defined in models.py
    # in your MySQL database if they don't already exist.
    Base.metadata.create_all(bind=engine)