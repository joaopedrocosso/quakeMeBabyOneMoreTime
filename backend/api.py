from typing import List
from fastapi import Body, HTTPException, APIRouter

from models import EventFilter, Catalog, UploadEvent
import service


router = APIRouter()


@router.post("/list_events", response_model=List[Catalog])
async def list_events(filter: EventFilter = Body(...)):
    return service.list_events(filter)

@router.get("/event/{event_id}", response_model=Catalog)
def get_event(event_id: str):
    return service.get_event(event_id)

@router.post("/upload_event/", response_model=Catalog)
def upload_event(event: UploadEvent):
    if event.file.content_type != 'text/csv':
        return {"error": "Wrong file type."}
    service.save_event(event)
    return service.process_event(event)

@router.post("/list_user_events", response_model=List[Catalog])
def list_events(filter: EventFilter):
    return service.list_user_events(filter)

@router.get("/event/{user_event_id}", response_model=Catalog)
def get_event(user_event_id: str):
    return service.get_user_event(user_event_id)
    
@router.get("/event/{event_id}/listen")
def listen_event(event_id: str):
    try:    
        event_sound = service.listen_event(event_id)
        return event_sound
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

