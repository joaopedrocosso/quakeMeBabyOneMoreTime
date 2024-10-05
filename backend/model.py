from datetime import datetime
from enum import Enum

from pydantic import BaseModel

class Location(Enum):
    APOLLO_12 = "Apollo 12"
    APOLLO_15 = "Apollo 15"
    APOLLO_16 = "Apollo 16"
    INSIGHT = "InSight"

class SeismicEvent(BaseModel):
    id: int
    body: str
    filename: str
    real_arrival_time_rel: float
    evid: str
    mq_type: str
    network: str
    station: str 
    location: str 
    starttime: datetime
    endtime: datetime
    sampling_rate: float
    identified_arrival_time_rel: float
    detection_duration: float
    selection_duration: float
    file_original_size: int
    file_selection_size: int
    original_broadcast: str
    selection_broadcast: str
    model_error: float
    features_at_detection: list
    timestamp_error: float


# User detections
class UserSeismicDetection(BaseModel):
    id: int
    filename: str
    real_arrival_time_rel: float
    evid: str
    mq_type: str
    network: str
    station: str
    location: str
    starttime: datetime
    endtime: datetime

class UserSeismicDetectionCreate(BaseModel):
    filename: str