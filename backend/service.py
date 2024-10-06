import pickle
from fastapi.responses import FileResponse
import numpy as np
import pandas as pd
from scipy.io.wavfile import write

from models import Data, UploadEvent, EventFilter, UserEventFilter
import repository

def list_data(filter: list):
    event_filter = UserEventFilter(**dict(filter))
    return repository.list_data(event_filter)

def get_data(event_id: str):
    return repository.get_data_by_id(event_id)

def list_events(filter: list):
    event_filter = EventFilter(**dict(filter))
    return repository.list_events(event_filter)

def get_event(event_id: str):
    return repository.get_event_by_id(event_id)

def list_user_events(filter: list):
    event_filter = EventFilter(**dict(filter))
    return repository.list_user_events(event_filter)

def get_user_event(event_id: str):
    return repository.get_user_event_by_id(event_id)

def save_event(upload_event: UploadEvent, content: bytes, result: str, audio: bytes):
    repository.save_event(upload_event, content, result, audio)

def process_event(upload_event: UploadEvent, content: bytes):
    from io import BytesIO

    with open('file.pkl', 'rb') as arquivo_modelo:
        modelo = pickle.load(arquivo_modelo)
    dados = pd.read_csv(BytesIO(content))
    # Faz previsões usando o modelo carregado
    previsoes = modelo.predict(dados)

    convert_to_audio(upload_event.filename, dados['velocity'])

    with open(upload_event.filename, 'rb') as file:
                wav_bytes = file.read()

    return save_event(upload_event, BytesIO(content), previsoes, wav_bytes), FileResponse(path="./", media_type='audio/mpeg', filename=upload_event.filename +'.wav')


def listen_event(event_id: str):
    event = get_data(event_id)
    
    convert_to_audio(event.filename, event.velocity.split())
    
    return FileResponse(path="./", media_type='audio/mpeg', filename=event.filename +'.wav')


def convert_to_audio(filename: str, velocity: list[float]):
    normalized_amplitude = velocity / np.max(np.abs(velocity))

    # Convert to appropriate audio format (int16)
    audio_data = np.int16(normalized_amplitude * 32767)

    taxa_amostragem = 44100

    write(filename + ".wav", taxa_amostragem, audio_data)
