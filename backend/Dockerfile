FROM python:3.9-slim

RUN apt-get update \
    && apt-get -y install libpq-dev gcc

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD uvicorn main:app --host 0.0.0.0 --reload