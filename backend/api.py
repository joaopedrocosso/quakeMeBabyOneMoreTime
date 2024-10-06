from typing import List
from fastapi import Body, File, Form, HTTPException, APIRouter, UploadFile

from models import EventFilter, Catalog, UserEventFilter, Data, UserEvent
import service


router = APIRouter()

@router.post("/list_data", response_model=List[Data])
async def list_events(filter: UserEventFilter = Body(...)):
    return service.list_data(filter)

@router.get("/data/{event_id}", response_model=Data)
async def get_event(event_id: str):
    return service.get_data(event_id)

@router.post("/list_events", response_model=List[Catalog])
async def list_events(filter: EventFilter = Body(...)):
    return service.list_events(filter)

@router.get("/event/{event_id}", response_model=Catalog)
async def get_event(event_id: str):
    return service.get_event(event_id)

@router.get("/event/{event_id}/listen", response_model=Catalog)
async def get_event(event_id: str):
    return service.listen_event(event_id)

@router.post("/list_user_events", response_model=List[UserEvent])
async def list_events(filter: UserEventFilter = Body(...)):
    return service.list_user_events(filter)

@router.get("/user_event/{user_event_id}", response_model=UserEvent)
async def get_event(user_event_id: str):
    return service.get_user_event(user_event_id)
    
@router.post("/upload_event/", response_model=UserEvent)
async def upload_event(sampling_rate: float = Form(...), file: UploadFile = File(...)):
    print(file)
    # if upload_event.file.content_type != 'text/csv':
    #     return {"error": "Wrong file type."}
    content = await file.read()

    if len(content) > 5000:
        raise HTTPException(status_code=400, detail="O arquivo excede o tamanho máximo permitido")

    try:
        return service.process_event(file, content, sampling_rate)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Reading error: {e}")
    
@router.get("/user_event/{user_event_id}/listen", response_model=UserEvent)
async def get_event(user_event_id: str):
    return service.get_user_event(user_event_id)
    