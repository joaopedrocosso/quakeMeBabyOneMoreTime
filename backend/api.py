from typing import List
from fastapi import HTTPException, APIRouter

from model import EventFilter, SeismicEvent, UploadEvent
import service


router = APIRouter()


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


@router.get("/event/{event_id}/listen")
def listen_detection(event_id: str):
    try:    
        event_sound = service.listen_event(event_id)
        return event_sound
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

