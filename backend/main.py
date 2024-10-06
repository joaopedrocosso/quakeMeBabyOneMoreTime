from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router


app = FastAPI(debug=True)
app.include_router(router)


@app.get("/ping")
def ping():
    return "pong"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
