from datetime import datetime

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


def list_data(filter: models.DataFilter):
    filters = []

    if filter.evid:
        filters.append(dbmodels.Data.evid >= filter.evid)

    # if filter.catalog_id:
    #     filters.append(dbmodels.Data.catalog_id >= filter.catalog_id)

    return get_db().query(dbmodels.Data).all()

def get_data_by_id(event_id: int):
    return get_db().query(dbmodels.Data).filter(dbmodels.Data.id == event_id).first()

def list_events(filter: models.EventFilter):
    filters = []
    
    if filter.station:
        filters.append(dbmodels.Catalog.station == filter.station)

    if filter.starttime:
        filters.append(dbmodels.Catalog.starttime >= filter.starttime)

    if filter.endtime:
        filters.append(dbmodels.Catalog.starttime <= filter.endtime)

    if filter.body:
        filters.append(dbmodels.Catalog.body == filter.body)

    print(filter)
    print(filters)
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


def save_event(event: object, content: bytes, result: bool, audio: bytes, sampling_rate: float):
    new_event = dbmodels.UserEvent()
    new_event.filename = event.filename
    new_event.content = content
    new_event.event = result
    new_event.audio = audio
    new_event.analysis_date = datetime.now()
    new_event.sampling_rate = sampling_rate

    with get_db() as db:
        db.add(new_event)
        db.commit()
        db.refresh(new_event)

    return new_event

def update_event(event: dbmodels.Catalog, audio: bytes):
    event.audio = audio

    get_db().query(dbmodels.Catalog)
    get_db().commit()
    get_db().refresh(event)

    return event