import copy
from keras.models import load_model

def predict(df_data_csv, sampling_rate, filename):
    columns_to_check = ['time_rel(sec)', 'velocity(m/s)']
    missing_columns = [col for col in columns_to_check if col not in df_data_csv.columns]
    
    if len(missing_columns)>0:
        return "Error, time_rel(sec) and velocity(m/s) columns are missing on the csv"

    # Concatenando novas features
    df_data_csv['filename']=filename
    features = process_seismic_data(df_data_csv, sampling_rate)
    df_data_csv['mean_velocity']= features['mean_velocity']
    df_data_csv['std_velocity']= features['std_velocity']
    df_data_csv['max_velocity']= features['max_velocity']
    df_data_csv['min_velocity']= features['min_velocity']
    df_data_csv['total_energy']= features['total_energy']
    df_data_csv['rms_value']= features['rms_value']
    df_data_csv['peak_count']= features['peak_count']
    df_data_csv['valley_count']= features['valley_count']
    df_data_csv['fft_values']= features['fft_values']
    df_data_csv['fft_freqs']= features['fft_freqs']
    df_data_csv['autocorrelation']= features['autocorrelation']
    df_data_csv['acceleration']= features['acceleration']
    df_data_csv['jerk']= features['jerk']
    df_data_csv['cumulative_energy']= features['cumulative_energy']
    
    
    temp = copy.deepcopy(df_data_csv)
    temp.drop(['time_abs(%Y-%m-%dT%H:%M:%S.%f)','filename'],axis=1,inplace=True)
    
    model = load_model('./best_model_nasa.keras')
    df_data_csv['y_pred']=model.predict(temp,verbose=2)
    result = df_data_csv[df_data_csv['y_pred'] == 1].groupby('filename', as_index=False).nth(0)
    return result

import numpy as np
import pandas as pd
from scipy.signal import find_peaks
from scipy.fft import fft, fftfreq
from scipy.integrate import cumulative_trapezoid

# Função para calcular derivada
def derivative(data, sampling_rate):
    dt = 1 / sampling_rate
    return np.gradient(data, dt)

# Função para calcular energia do sinal (soma do quadrado da velocidade)
def signal_energy(velocity):
    return np.sum(np.square(velocity))

# Função para calcular RMS
def rms(velocity):
    return np.sqrt(np.mean(np.square(velocity)))

# Função para detectar picos e vales
def peaks_and_valleys(velocity):
    peaks, _ = find_peaks(velocity)
    valleys, _ = find_peaks(-velocity)  # Inverter o sinal para encontrar vales
    return peaks, valleys

# Função para calcular Transformada de Fourier
def compute_fft(velocity, sampling_rate):
    n = len(velocity)
    fft_values = fft(velocity)
    fft_freqs = fftfreq(n, 1 / sampling_rate)
    return fft_values, fft_freqs

# Função para calcular autocorrelação
def autocorrelation(velocity):
    return np.correlate(velocity, velocity, mode='full')[len(velocity)-1:]

# Função para calcular energia acumulada com a frequência de amostragem
def cumulative_energy(velocity, sampling_rate):
    dt = 1 / sampling_rate
    return cumulative_trapezoid(np.square(velocity), dx=dt, initial=0)

# Função para extrair todas as features sugeridas
def extract_features(df, sampling_rate):
    time_rel = df['time_rel(sec)']
    velocity = df['velocity(m/s)']
    
    # Derivada primeira (Aceleração) e segunda derivada (Jerk)
    acceleration = derivative(velocity, sampling_rate)
    jerk = derivative(acceleration, sampling_rate)  # Segunda derivada
    
    # Energia total e energia acumulada
    total_energy = signal_energy(velocity)
    cumulative_energy_values = cumulative_energy(velocity, sampling_rate)
    
    # RMS da velocidade
    rms_value = rms(velocity)
    
    # Picos e vales
    peaks, valleys = peaks_and_valleys(velocity)
    
    # Transformada de Fourier (FFT)
    fft_values, fft_freqs = compute_fft(velocity, sampling_rate)
    
    # Autocorrelação
    auto_corr = autocorrelation(velocity)
    
    # Estatísticas básicas
    mean_velocity = np.mean(velocity)
    std_velocity = np.std(velocity)
    max_velocity = np.max(velocity)
    min_velocity = np.min(velocity)
    
    # Resultados
    features = {
        'mean_velocity': mean_velocity,
        'std_velocity': std_velocity,
        'max_velocity': max_velocity,
        'min_velocity': min_velocity,
        'total_energy': total_energy,
        'rms_value': rms_value,
        'peak_count': len(peaks),
        'valley_count': len(valleys),
        'fft_values': fft_values,
        'fft_freqs': fft_freqs,
        'autocorrelation': auto_corr,
        'acceleration': acceleration,
        'jerk': jerk,
        'cumulative_energy': cumulative_energy_values
    }
    
    return features

def process_seismic_data(df, sampling_rate):
    features = extract_features(df, sampling_rate)
    
    return features