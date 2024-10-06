from datetime import datetime
from typing import Optional
from fastapi import UploadFile, File

from pydantic import BaseModel


class EventFilter(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    station: Optional[str] = None

class UserEventFilter(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class UploadEvent(BaseModel):
    file: UploadFile = File(...)
    sampling_rate: float

class UserSeismicDetectionCreate(BaseModel):
    filename: str

class Catalog(BaseModel):
    id: int
    body: str
    filename: str
    arrival_time_abs: Optional[datetime] = None
    arrival_time_rel: Optional[float] = None
    evid: Optional[str] = None
    mq_type: Optional[str] = None
    network: Optional[str] = None
    station: Optional[str] = None
    location: Optional[str] = None
    channel: Optional[str] = None
    starttime: Optional[datetime] = None
    endtime: Optional[datetime] = None
    sampling_rate: Optional[float] = None
    delta: Optional[float] = None
    npts: Optional[int] = None
    calib: Optional[float] = None
    _format: Optional[str] = None
    mseed: Optional[object] = None


class Data(BaseModel):
    id: int
    body: str 
    filename: str
    time_abs: datetime
    time_rel: float
    velocity: float
    event: str

class EventAudio(BaseModel):
    id: int
    event_id: int
    user_event_id: int
    audio: bytes

    class Config:
        orm_mode = True