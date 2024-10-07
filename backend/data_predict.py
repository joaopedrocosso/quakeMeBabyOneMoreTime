import copy
from keras.models import load_model
import numpy as np
import pandas as pd
from scipy.signal import find_peaks
from scipy.fft import fft, fftfreq
from scipy.integrate import cumulative_trapezoid

def predict(df_data_csv, sampling_rate, filename):
    import json

    columns_to_check = ['time_rel(sec)', 'velocity(m/s)']
    missing_columns = [col for col in columns_to_check if col not in df_data_csv.columns]
    df_data_csv.dropna(inplace=True)

    if len(missing_columns) > 0:
        return "Error, time_rel(sec) and velocity(m/s) columns are missing on the csv"

    # Concatenando novas features
    df_data_csv['filename'] = filename
    features = process_seismic_data(df_data_csv, sampling_rate)
    df_data_csv['mean_velocity'] = features['mean_velocity']
    df_data_csv['std_velocity'] = features['std_velocity']
    df_data_csv['max_velocity'] = features['max_velocity']
    df_data_csv['min_velocity'] = features['min_velocity']
    df_data_csv['total_energy'] = features['total_energy']
    df_data_csv['rms_value'] = features['rms_value']
    df_data_csv['peak_count'] = features['peak_count']
    df_data_csv['valley_count'] = features['valley_count']
    df_data_csv['fft_values'] = features['fft_values']
    df_data_csv['fft_freqs'] = features['fft_freqs']
    df_data_csv['autocorrelation'] = features['autocorrelation']
    df_data_csv['acceleration'] = features['acceleration']
    df_data_csv['jerk'] = features['jerk']
    df_data_csv['cumulative_energy'] = features['cumulative_energy']

    temp = copy.deepcopy(df_data_csv)
    temp.drop(['time_abs(%Y-%m-%dT%H:%M:%S.%f)', 'filename'], axis=1, inplace=True)

    model = load_model('.//best_model_nasa.keras')
    y_pred = model.predict(temp, verbose=2)
    df_data_csv['y_pred'] = (y_pred > 0.5).astype(int)  # Convert to 0 or 1

    # Generating output features
    result = df_data_csv[df_data_csv['y_pred'] == 1].groupby('filename', as_index=False).nth(0).reset_index()
    memory_usage_per_group = df_data_csv[df_data_csv['y_pred'] == 1].groupby('filename').apply(
        lambda group: group.memory_usage(deep=True).sum())
    result['file_selection_size(kb)'] = result['filename'].map(memory_usage_per_group)

    features = result.drop(['file_selection_size(kb)'], axis=1)

    json_list = []
    for index, row in features.iterrows():
        row_dict = row.to_dict()

        # Convert complex numbers to strings
        for key, value in row_dict.items():
            if isinstance(value, complex):
                row_dict[key] = str(value)

        json_list.append(json.dumps(row_dict))

    result = result[['filename', 'time_rel(sec)', 'velocity(m/s)', 'index', 'file_selection_size(kb)']].rename(
        columns={"index": "index_predict", "time_rel(sec)": "identified_arrival_time_rel(sec)"})

    result2 = df_data_csv.groupby('filename', as_index=False).tail(1).reset_index()[
        ['filename', 'index', 'time_rel(sec)']].rename(
        columns={"index": "index_tail", "time_rel(sec)": "detection_duration(sec)"}
    )
    memory_usage_per_group = df_data_csv.groupby('filename').apply(lambda group: group.memory_usage(deep=True).sum())
    result2['file_original_size(kb)'] = result2['filename'].map(memory_usage_per_group)

    result3 = pd.concat([result, result2.drop(['filename'], axis=1)], axis=1)
    result3['selection_duration'] = result3['detection_duration(sec)'] - result3['identified_arrival_time_rel(sec)']
    result3['features'] = json_list
    conditions = [
        result3['filename'].str.contains('s12'),
        result3['filename'].str.contains('s15'),
        result3['filename'].str.contains('s16')
    ]
    values = [51.2, 85.6, 85.6]
    result3['transmission_speed'] = np.select(conditions, values, default=256)
    result3['original_broadcast'] = result3['file_original_size(kb)'] / result3['transmission_speed']
    result3['selection_broadcast'] = result3['file_selection_size(kb)'] / result3['transmission_speed']
    result3.drop(['index_predict', 'index_tail', 'transmission_speed'], inplace=True, axis=1)
    return result3

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