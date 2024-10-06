from config import DATABASE_URL
import database_models as dbmodels
import models
from sqlalchemy import create_engine, and_
from sqlalchemy.orm import sessionmaker


print("Connecting to database...")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()

def get_event_by_id(event_id: int):
    return get_db().query(dbmodels.Catalog).filter(dbmodels.Catalog.id == event_id).first()


def list_events(filter: models.EventFilter):
    filters = []
    
    if filter.station:
        filters.append(dbmodels.Catalog.station == filter.station)

    if filter.start_date:
        filters.append(dbmodels.Catalog.starttime >= filter.start_date)

    if filter.end_date:
        filters.append(dbmodels.Catalog.starttime <= filter.end_date)

    query = get_db().query(dbmodels.Catalog)

    if filters:
        query = query.filter(and_(*filters))

    return query.all()


def save_event(event: dbmodels.UserEvent):
    return get_db().save_event(event)