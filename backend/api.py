from typing import List
from fastapi import Body, File, Form, HTTPException, APIRouter, UploadFile

from models import EventFilter, Catalog, UserEventFilter, Data, UserEvent
import service


router = APIRouter()

@router.post("/list_data", response_model=List[Data])
async def list_data(filter: UserEventFilter = Body(...)):
    return service.list_data(filter)

@router.get("/data/{event_id}", response_model=Data)
async def get_data(event_id: str):
    return service.get_data(event_id)

@router.post("/list_events", response_model=List[Catalog])
async def list_events(filter: EventFilter = Body(...)):
    return service.list_events(filter)

@router.get("/event/{event_id}", response_model=Catalog)
async def get_event(event_id: str):
    return service.get_event(event_id)

@router.get("/event/{event_id}/listen")
async def listen_event(event_id: int):
    return service.listen_event(event_id)

@router.post("/list_user_events", response_model=List[UserEvent])
async def list_events(filter: UserEventFilter = Body(...)):
    return service.list_user_events(filter)

@router.get("/user_event/{user_event_id}", response_model=UserEvent)
async def get_user_event(user_event_id: str):
    return service.get_user_event(user_event_id)
    
@router.post("/upload_event")
async def upload_event(sampling_rate: float = Form(...), file: UploadFile = File(...)):
    print(file)
    content = await file.read()

    if len(content) > 50000000:
        raise HTTPException(status_code=400, detail="File exceeds maximum allowed size")

    try:
        return service.process_event(file, content, sampling_rate)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Reading error: {e}")
    
@router.get("/user_event/{user_event_id}/listen", response_model=UserEvent)
async def listen_user_event(user_event_id: str):
    return service.listen_user_event(user_event_id)
    