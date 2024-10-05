from datetime import datetime

from pydantic import BaseModel


class SeismicDetection(BaseModel):
    time_abs: datetime
    time_rel: float
    velocity: float
    location: str # Apollo 12, Apollo 15, Apollo 16, InSight
