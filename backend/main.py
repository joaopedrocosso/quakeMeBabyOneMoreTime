from typing import List
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import uvicorn
from fastapi import FastAPI

from api import router
from config import DATABASE_URL


app = FastAPI(debug=True)
app.include_router(router)

print("Connecting to database...")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/ping")
def pin():
    return "pong"
