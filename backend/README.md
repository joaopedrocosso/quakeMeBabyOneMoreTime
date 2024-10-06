### Prepare enviment
Make sure you have installed Python12 and created and environment (venv, conda, etc)

### Install dependencies:
```bash
pip install -r requirements.txt
```

### Run app:
```bash
uvicorn main:app --reload
```

### API:
http://localhost:8000/docs


### To Test the API:
Install REST Client VSCode extension and use the file `api.http`
