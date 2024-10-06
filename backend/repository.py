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


def list_data():
    filters = []

    if filter.start_date:
        filters.append(dbmodels.Data.time_abs >= filter.start_date)

    if filter.end_date:
        filters.append(dbmodels.Catalog.time_abs <= filter.end_date)

    return get_db().query(dbmodels.Catalog).all()

def get_data_by_id(event_id: int):
    return get_db().query(dbmodels.Data).filter(dbmodels.Data.id == event_id).first()

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

def get_event_by_id(event_id: int):
    return get_db().query(dbmodels.Catalog).filter(dbmodels.Catalog.id == event_id).first()


def list_user_events(filter: models.EventFilter):
    filters = []
    
    if filter.start_date:
        filters.append(dbmodels.UserEvent.starttime >= filter.start_date)

    if filter.end_date:
        filters.append(dbmodels.UserEvent.starttime <= filter.end_date)

    query = get_db().query(dbmodels.UserEvent)

    if filters:
        query = query.filter(and_(*filters))

    return query.all()

def get_user_event_by_id(event_id: int):
    return get_db().query(dbmodels.UserEvent).filter(dbmodels.UserEvent.id == event_id).first()


def save_event(event: models.UploadEvent, content: bytes, result: str, audio: bytes):
    new_event = dbmodels.UserEvent()
    new_event.filename = event.file.filename
    new_event.content = content
    new_event.event = result
    new_event.audio = audio

    get_db().query(dbmodels.UserEvent)
    get_db().add(new_event)
    get_db().commit()
    get_db().refresh(new_event)

    return new_event