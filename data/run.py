import os
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
from obspy import read
from dotenv import load_dotenv
from tqdm import tqdm
from obspy.core.utcdatetime import UTCDateTime

import json

# Load environment variables
load_dotenv()

# Connect to the database
def connect_db():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT')
    )
    return conn

# Create tables if they don't exist
def create_tables(conn):
    with conn.cursor() as cur:
        cur.execute("""
        CREATE TABLE IF NOT EXISTS data (
            id BIGSERIAL PRIMARY KEY,
            body TEXT,
            filename TEXT,
            time_abs TIMESTAMPTZ,
            time_rel DOUBLE PRECISION,
            velocity DOUBLE PRECISION,
            event TEXT
        );
        CREATE TABLE IF NOT EXISTS catalog (
            id BIGSERIAL PRIMARY KEY,
            body TEXT,
            filename TEXT,
            arrival_time_abs TIMESTAMPTZ,
            arrival_time_rel DOUBLE PRECISION,
            evid TEXT,
            mq_type TEXT,
            network TEXT,
            station TEXT,
            location TEXT,
            channel TEXT,
            starttime TIMESTAMPTZ,
            endtime TIMESTAMPTZ,
            sampling_rate DOUBLE PRECISION,
            delta DOUBLE PRECISION,
            npts BIGINT,
            calib DOUBLE PRECISION,
            _format TEXT,
            mseed JSONB
        );
        CREATE TABLE IF NOT EXISTS model_results (
            id BIGSERIAL PRIMARY KEY,
            body TEXT,
            filename TEXT,
            real_arrival_time_rel DOUBLE PRECISION,
            evid TEXT,
            mq_type TEXT,
            network TEXT,
            station TEXT,
            location TEXT,
            starttime TIMESTAMPTZ,
            endtime TIMESTAMPTZ,
            sampling_rate DOUBLE PRECISION DOUBLE PRECISION,
            identified_arrival_time_rel DOUBLE PRECISION,
            detection_duration DOUBLE PRECISION,
            selection_duration DOUBLE PRECISION,
            file_original_size TEXT,
            file_selection_size 
            original_broadcast TEXT,
            selection_broadcast TEXT,
            model_error DOUBLE PRECISION,
            features_at_detection TEXT,
            timestamp_error INTEGER
        );
        """)
        conn.commit()

# Function to perform batch inserts
def batch_insert(cur, table_name, columns, data):
    # Build the SQL query without manually adding %s placeholders
    insert_query = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES %s"
    # Use execute_values to handle multiple records efficiently
    execute_values(cur, insert_query, data)

# Process CSV file in batches
def process_csv(file_path, table_name, conn, body, batch_size=10000):
    if os.path.getsize(file_path) == 0:
        print(f"Empty CSV file: {file_path}. Skipping.")
        return

    try:
        df = pd.read_csv(file_path)
        if df.empty:
            print(f"CSV file with no data: {file_path}. Skipping.")
            return
        
        # Map and handle data according to available columns
        df['time_abs'] = pd.to_datetime(df.get('time_abs', df.get('time')))
        df['time_rel'] = df.get('time_rel', df.get('rel_time'))
        df['velocity'] = df.get('velocity', None)  # If 'velocity' does not exist, insert None (null)

        # Prepare data for batch insertion
        data_to_insert = []
        with conn.cursor() as cur:
            for i, row in tqdm(df.iterrows(), total=len(df), desc=f"Processing {file_path}"):
                data_to_insert.append((
                    body, os.path.basename(file_path), row['time_abs'], row['time_rel'], row['velocity'], 'event'
                ))

                # When batch size is reached, perform the insertion
                if len(data_to_insert) >= batch_size:
                    batch_insert(cur, table_name, ['body', 'filename', 'time_abs', 'time_rel', 'velocity', 'event'], data_to_insert)
                    conn.commit()
                    data_to_insert.clear()

            # Insert the remaining data
            if data_to_insert:
                batch_insert(cur, table_name, ['body', 'filename', 'time_abs', 'time_rel', 'velocity', 'event'], data_to_insert)
                conn.commit()

    except pd.errors.EmptyDataError:
        print(f"Error: The CSV file {file_path} is empty or corrupted. Skipping.")

# Process MSEED file in batches
def process_mseed(file_path, conn, body, batch_size=100):
    st = read(file_path)
    data_to_insert = []
    with conn.cursor() as cur:
        for trace in tqdm(st, desc=f"Processing {file_path}"):
            stats = trace.stats
            
            # Converting UTCDateTime to datetime
            starttime = stats.starttime.datetime if isinstance(stats.starttime, UTCDateTime) else stats.starttime
            endtime = stats.endtime.datetime if isinstance(stats.endtime, UTCDateTime) else stats.endtime
            
            # Check if the mseed field exists and is a dictionary
            mseed_info = json.dumps(stats.mseed) if hasattr(stats, 'mseed') and isinstance(stats.mseed, dict) else None

            # Add data to batch
            data_to_insert.append((
                body, os.path.basename(file_path), starttime, None,
                stats.network, stats.station, stats.location, stats.channel, 
                starttime, endtime, stats.sampling_rate, stats.delta, stats.npts, stats.calib, 'MSEED', mseed_info
            ))

            # When batch size is reached, perform the insertion
            if len(data_to_insert) >= batch_size:
                batch_insert(cur, 'catalog', ['body', 'filename', 'arrival_time_abs', 'arrival_time_rel', 'network', 'station', 'location', 'channel', 'starttime', 'endtime', 'sampling_rate', 'delta', 'npts', 'calib', '_format', 'mseed'], data_to_insert)
                conn.commit()
                data_to_insert.clear()

        # Insert the remaining data
        if data_to_insert:
            batch_insert(cur, 'catalog', ['body', 'filename', 'arrival_time_abs', 'arrival_time_rel', 'network', 'station', 'location', 'channel', 'starttime', 'endtime', 'sampling_rate', 'delta', 'npts', 'calib', '_format', 'mseed'], data_to_insert)
            conn.commit()

# Traverse directories and process files in batches
def process_directory(directory, conn, body, batch_size=10000):
    total_files = sum([len(files) for _, _, files in os.walk(directory)])
    with tqdm(total=total_files, desc=f"Processing directory {directory}") as pbar:
        for root, _, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                if file.endswith('.csv'):
                    process_csv(file_path, 'data', conn, body, batch_size)
                elif file.endswith('.mseed'):
                    process_mseed(file_path, conn, body, batch_size)
                pbar.update(1)

# Main function
def main():
    conn = connect_db()
    create_tables(conn)
    
    directories = {
        'mars': [
            './space_apps_2024_seismic_detection/data/mars/training/catalogs',
            './space_apps_2024_seismic_detection/data/mars/training/data'
        ],
        'lunar': [
            './space_apps_2024_seismic_detection/data/lunar/training/data',
            './space_apps_2024_seismic_detection/data/lunar/training/catalogs'
        ]
    }

    # Set batch size (adjustable)
    batch_size = 50000

    for body, dirs in directories.items():
        for directory in dirs:
            process_directory(directory, conn, body, batch_size)

    conn.close()

if __name__ == '__main__':
    main()
