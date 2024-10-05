from typing import List
from fastapi import UploadFile
import numpy as np
from obspy import read
from scipy.io.wavfile import write

from models import UploadEvent, EventFilter
import repository


def list_events(filter: list):
    event_filter = EventFilter(**dict(filter))
    return repository.list_events(event_filter)

def get_event(event_id: str):
    return repository.get_event_by_id(event_id)

def save_event(event: UploadEvent):
    repository.save_event(event)

def process_event(file: UploadFile):
    return ''

def listen_event(event_id: str):
    return ''

def save_audio_from_user_detection(id: str):
    # Leia o arquivo MiniSEED
    st = read("xa.s16.00.mhz.1972-09-10HR00_evid00075.mseed")

    # Combine todos os traços (se houver mais de um canal de dados)
    tr = st[0]  # Pegue o primeiro traço (ou combine vários se necessário)

    # Acelere o sinal (normalmente você precisa acelerar para torná-lo audível)
    # fator_aceleracao = 10  # Defina a taxa de aceleração
    # tr.decimate(factor=fator_aceleracao)  # Diminui a resolução temporal

    # Normalize os dados entre -1 e 1 para garantir que eles possam ser convertidos em som
    data = tr.data / max(np.abs(tr.data))

    # Multiplicar pelos níveis de amplitude para conversão para 16-bit PCM
    data = np.int16(data * 32767)

    # Defina uma taxa de amostragem adequada (e.g. 44100 Hz)
    taxa_amostragem = 44100

    # Salve o arquivo como áudio WAV
    write("saida_audio.wav", taxa_amostragem, data)
