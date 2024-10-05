from main import get_db

def get_event_by_id(event_id: int):
    return get_db.get_event_by_id(event_id)