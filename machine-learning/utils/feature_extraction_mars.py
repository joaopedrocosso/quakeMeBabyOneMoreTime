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
    time_rel = df['rel_time(sec)']
    velocity = df['velocity(c/s)']
    
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

# Função para carregar CSV e extrair features
def process_seismic_data(df, sampling_rate):
    features = extract_features(df, sampling_rate)
    
    return features