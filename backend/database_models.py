from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, LargeBinary, BigInteger, JSON, Boolean, \
    Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Catalog(Base):
    __tablename__ = 'catalog'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    body = Column(String)
    filename = Column(String)
    evid = Column(String)
    network = Column(String)
    station = Column(String)
    location = Column(String)
    starttime = Column(DateTime)
    endtime = Column(DateTime)
    sampling_rate = Column(Float)
    identified_arrival_time_rel = Column(Float)
    detection_duration = Column(Float)
    selection_duration = Column(Float)
    file_original_size = Column(String)
    file_selection_size = Column(String)
    original_broadcast = Column(String)
    selection_broadcast = Column(String)
    features_at_detection = Column(String)
    audio = Column(LargeBinary)


class Data(Base):
    __tablename__ = 'data'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    evid = Column(String)
    time_abs = Column(String)
    time_rel = Column(String)
    velocity = Column(String)
    event = Column(Boolean)
    catalog_id = Column(Integer)


seq_user_event_id = Sequence('seq_user_event_id', start=1, increment=1)

class UserEvent(Base):
    __tablename__ = 'user_event'
    id = Column(BigInteger, seq_user_event_id, primary_key=True, autoincrement=True)
    filename = Column(String)
    sampling_rate = Column(Float)
    content = Column(LargeBinary)
    event = Column(Boolean)
    audio = Column(LargeBinary)
    analysis_date = Column(DateTime)
