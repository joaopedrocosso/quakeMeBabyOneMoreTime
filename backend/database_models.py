from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, LargeBinary, BigInteger, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Catalog(Base):
    __tablename__ = 'catalog'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    body = Column(String)
    filename = Column(String)
    arrival_time_abs = Column(DateTime)
    arrival_time_rel = Column(Float)
    evid = Column(String)
    mq_type = Column(String)
    network = Column(String)
    station = Column(String)
    location = Column(String)
    channel = Column(String)
    starttime = Column(DateTime)
    endtime = Column(DateTime)
    sampling_rate = Column(Float)
    delta = Column(Float)
    npts = Column(Integer)
    calib = Column(Float)
    _format = Column(String)
    mseed = Column(JSON)

class Data(Base):
    __tablename__ = 'data'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    body = Column(String)
    filename = Column(String)
    time_abs = Column(DateTime)
    time_rel = Column(Float)
    velocity = Column(Float)
    event = Column(String)

class UserEvent(Base):
    __tablename__ = 'user_event'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    filename = Column(String)
    event = Column(String)


class event_audio(Base):
    __tablename__ = 'event_audio'
    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey('event.id'))
    user_event_id = Column(Integer, ForeignKey('user_event.id'))
    audio = Column(LargeBinary)
