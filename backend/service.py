import copy
from io import StringIO
import wave
from data_predict import predict
from fastapi.responses import FileResponse
import numpy as np
import pandas as pd
from scipy.io.wavfile import write

from models import DataFilter, EventFilter, UserEventFilter
import repository

def list_data(filter: list):
    event_filter = DataFilter(**dict(filter))
    return repository.list_data(event_filter)

def get_data(event_id: str):
    return repository.get_data_by_id(event_id)

def list_events(filter: list):
    event_filter = EventFilter(**dict(filter))
    return repository.list_events(event_filter)

def get_event(event_id: int):
    event = repository.get_event_by_id(event_id)
    handle_audio(event)
    return event

def list_user_events(filter: list):
    event_filter = EventFilter(**dict(filter))
    return repository.list_user_events(event_filter)

def get_user_event(event_id: int):
    return repository.get_user_event_by_id(event_id)

def save_event(upload_event: object, content: bytes, result: bool, audio: bytes, sampling_rate: float):
    return repository.save_event(upload_event, content, result, audio, sampling_rate)

def process_event(upload_event: object, content: bytes, sampling_rate: float):
    from io import BytesIO

    dados = pd.read_csv(StringIO(content.decode("utf-8")))
    print(dados)

    previsao = predict(dados, sampling_rate, upload_event.filename)

    convert_to_audio(upload_event.filename, dados['velocity(m/s)'])

    with open(upload_event.filename + '.wav', 'rb') as file:
                wav_bytes = file.read()

    content_bytes = BytesIO(content).read()

    return save_event(upload_event, content_bytes, bool(previsao.y_pred.values[0]), wav_bytes, sampling_rate), FileResponse(path="./", media_type='audio/mpeg', filename=upload_event.filename +'.wav')


def listen_event(event_id: int):
    event = get_event(event_id)
    print(event)

    handle_audio(event)

    file_path = f"./{event.filename}.wav"
    return FileResponse(path=file_path, media_type='audio/mpeg', filename=event.filename +'.wav')


def listen_user_event(user_event_id: int):
    event = get_user_event(user_event_id)
    print(event)

    with open(event.filename + '.wav', mode='wb') as f:
        f.write(event.audio)

    file_path = f"./{event.filename}.wav"
    return FileResponse(path=file_path, media_type='audio/mpeg', filename=event.filename +'.wav')


def handle_audio(event):
    if event.audio is None:

        data_list = list_data([("evid", event.evid)])

        convert_to_audio(event.filename, [float(d.velocity) for d in data_list])

        with wave.open(event.filename + ".wav", "rb") as wav_file:
            frames = wav_file.readframes(wav_file.getnframes())
            repository.update_event(event, frames)

    else:
        with open(event.filename + '.wav', mode='wb') as f:
            f.write(event.audio)


def convert_to_audio(filename: str, velocity: list[float]):
    normalized_amplitude = velocity / np.max(np.abs(velocity))

    # Convert to appropriate audio format (int16)
    audio_data = np.int16(normalized_amplitude * 32767)

    taxa_amostragem = 44100

    write(filename + ".wav", taxa_amostragem, audio_data)
