from typing import List

from fastapi import FastAPI

from model import SeismicDetection


app = FastAPI(debug=True)


database: List[SeismicDetection] = []

@app.get("/ping")
def pong():
    return {"ping": "pong!"}

