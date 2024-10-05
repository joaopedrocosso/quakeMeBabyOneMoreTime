from datetime import datetime
from typing import List, Optional

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel

from model import SeismicEvent
import service


router = APIRouter()


class EventFilter(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    min_magnitude: Optional[float] = None
    max_magnitude: Optional[float] = None


class UploadEvent(BaseModel):
    file: object
    filename: str


@router.post("/list_events/", response_model=List[SeismicEvent])
def list_events(filter: EventFilter):
    return ''


@router.get("/event/{event_id}", response_model=SeismicEvent)
def get_event(event_id: str):
    return ''

@router.post("/upload_event/", response_model=SeismicEvent)
def insert_detection(event: UploadEvent):
    service.save_audio_from_user_detection(event.file)
    return 'detection'


@router.get("/detections/{timestamp}", response_model=SeismicEvent)
def read_detection(timestamp: str):
    if timestamp:
        return SeismicEvent(timestamp=datetime(1972, 9, 10, 0, 0), latitude=-22.4, longitude=-45.3, depth=10.0,
                                magnitude=5.5)
    raise HTTPException(status_code=404, detail="Detection not found")


@router.get("/detections/{event_id}/listen")
def listen_detection(event_id: str):
    return service.listen_event(event_id)

