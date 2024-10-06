import os
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
from obspy import read
from dotenv import load_dotenv
from tqdm import tqdm
from obspy.core.utcdatetime import UTCDateTime

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

# Create tables if they don't exist, ensuring BIGINT for id
def create_tables(conn):
    with conn.cursor() as cur:
        cur.execute("""
        CREATE TABLE IF NOT EXISTS data (
            id BIGINT GENERATED BY DEFAULT AS IDENTITY,
            evid TEXT,
            time_abs TEXT,
            time_rel TEXT,
            velocity TEXT,
            event BOOLEAN
        );
        CREATE TABLE IF NOT EXISTS catalog (
            id BIGINT GENERATED BY DEFAULT AS IDENTITY,
            body TEXT,
            filename TEXT,
            evid TEXT,
            network TEXT,
            station TEXT,
            location TEXT,
            starttime TIMESTAMPTZ,
            endtime TIMESTAMPTZ,
            sampling_rate DOUBLE PRECISION,
            identified_arrival_time_rel DOUBLE PRECISION,
            detection_duration DOUBLE PRECISION,
            selection_duration DOUBLE PRECISION,
            file_original_size TEXT,
            file_selection_size TEXT,
            original_broadcast TEXT,
            selection_broadcast TEXT,
            features_at_detection TEXT,
            audio BYTEA
        );
        """)
        conn.commit()

# Function to perform batch inserts
def batch_insert(cur, table_name, columns, data):
    insert_query = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES %s RETURNING id"
    execute_values(cur, insert_query, data)
    cur.execute('SELECT LASTVAL();')  # Retrieve the last inserted id
    return cur.fetchone()[0]

# Process CSV file and return the generated id and evid
def process_csv(file_path, table_name, conn, body, evid, batch_size=10000):
    print(f"Processing CSV: {file_path}")
    if os.path.getsize(file_path) == 0:
        print(f"Empty CSV file: {file_path}. Skipping.")
        return None, None

    try:
        # Ensure the CSV is read correctly
        df = pd.read_csv(file_path)
        if df.empty:
            print(f"CSV file with no data: {file_path}. Skipping.")
            return None, None

        # Handle possible variations in headers and ensure they are captured
        if 'time_abs' in df.columns:
            df['time_abs'] = df['time_abs'].astype(str)  # Ensure TEXT format
        elif 'time' in df.columns:
            df['time_abs'] = df['time'].astype(str)  # Use 'time' if 'time_abs' is missing
        else:
            df['time_abs'] = None  # If neither exists, set as None

        if 'time_rel' in df.columns:
            df['time_rel'] = df['time_rel'].astype(str)  # Ensure TEXT format
        elif 'rel_time' in df.columns:
            df['time_rel'] = df['rel_time'].astype(str)  # Use 'rel_time' if 'time_rel' is missing
        else:
            df['time_rel'] = None  # If neither exists, set as None

        if 'velocity' not in df.columns:
            df['velocity'] = df.get('velocity(c/s)', '').astype(str)  # Handling possible different header for velocity
        else:
            df['velocity'] = df['velocity'].astype(str)

        # Verify the values being captured for debugging
        print("Sample values captured:")
        print(df[['time_abs', 'time_rel', 'velocity']].head())

        data_to_insert = []
        with conn.cursor() as cur:
            for _, row in tqdm(df.iterrows(), total=len(df), desc=f"Processing {file_path}"):
                # Add row data with proper checks
                time_abs_value = row['time_abs'] if pd.notna(row['time_abs']) else None
                time_rel_value = row['time_rel'] if pd.notna(row['time_rel']) else None
                velocity_value = row['velocity'] if pd.notna(row['velocity']) else None

                # Print the values to ensure correct capture
                print(f"Inserting: time_abs={time_abs_value}, time_rel={time_rel_value}, velocity={velocity_value}")

                data_to_insert.append((
                    evid, time_abs_value, time_rel_value, velocity_value, None
                ))

                # Insert batch of data once batch size is reached
                if len(data_to_insert) >= batch_size:
                    batch_insert(cur, table_name, ['evid', 'time_abs', 'time_rel', 'velocity', 'event'], data_to_insert)
                    conn.commit()
                    data_to_insert.clear()  # Clear batch after insert

            # Insert remaining data if any
            if data_to_insert:
                batch_insert(cur, table_name, ['evid', 'time_abs', 'time_rel', 'velocity', 'event'], data_to_insert)
                conn.commit()

    except pd.errors.EmptyDataError:
        print(f"Error: The CSV file {file_path} is empty or corrupted. Skipping.")
        return None, None

    return None, evid

# Process MSEED file using the same evid and id from the CSV
def process_mseed(file_path, conn, body, evid, csv_id, batch_size=100):
    print(f"Processing MSEED: {file_path}")
    st = read(file_path)
    data_to_insert = []
    with conn.cursor() as cur:
        for trace in tqdm(st, desc=f"Processing {file_path}"):
            stats = trace.stats
            starttime = stats.starttime.datetime if isinstance(stats.starttime, UTCDateTime) else stats.starttime
            endtime = stats.endtime.datetime if isinstance(stats.endtime, UTCDateTime) else stats.endtime

            # Insert with the same CSV id and evid
            data_to_insert.append((
                body, os.path.basename(file_path), evid,
                stats.network, stats.station, stats.location,
                starttime, endtime, stats.sampling_rate,
                None, None, None, None, None, None, None, None, None
            ))

            if len(data_to_insert) >= batch_size:
                batch_insert(cur, 'catalog', ['body', 'filename', 'evid', 'network', 'station', 'location', 
                                              'starttime', 'endtime', 'sampling_rate',
                                              'identified_arrival_time_rel', 'detection_duration', 
                                              'selection_duration', 'file_original_size', 
                                              'file_selection_size', 'original_broadcast', 
                                              'selection_broadcast', 'features_at_detection', 'audio'], data_to_insert)
                conn.commit()
                data_to_insert.clear()

        if data_to_insert:
            batch_insert(cur, 'catalog', ['body', 'filename', 'evid', 'network', 'station', 'location', 
                                          'starttime', 'endtime', 'sampling_rate',
                                          'identified_arrival_time_rel', 'detection_duration', 
                                          'selection_duration', 'file_original_size', 
                                          'file_selection_size', 'original_broadcast', 
                                          'selection_broadcast', 'features_at_detection', 'audio'], data_to_insert)
            conn.commit()

# Traverse directories and process files in pairs (CSV + MSEED)
def process_directory(directory, conn, body, batch_size=10000):
    # Dictionary to store file pairs (key: base filename, value: dict of csv and mseed)
    file_pairs = {}

    # Recursively find all .csv and .mseed files in the directory
    for root, _, filenames in os.walk(directory):
        for file in filenames:
            file_path = os.path.join(root, file)
            base_filename = file.split('_evid')[0]  # Extract base filename before the evid part

            if file.endswith('.csv'):
                if base_filename not in file_pairs:
                    file_pairs[base_filename] = {}
                file_pairs[base_filename]['csv'] = file_path
            elif file.endswith('.mseed'):
                if base_filename not in file_pairs:
                    file_pairs[base_filename] = {}
                file_pairs[base_filename]['mseed'] = file_path

    # Process each pair of CSV and MSEED files
    for base_filename, files in tqdm(file_pairs.items(), desc=f"Processing directory {directory}"):
        csv_file = files.get('csv')
        mseed_file = files.get('mseed')

        if csv_file and mseed_file:
            evid = csv_file.split('_evid')[-1].replace('.csv', '')
            csv_id, evid = process_csv(csv_file, 'data', conn, body, evid, batch_size)

            if csv_id:
                process_mseed(mseed_file, conn, body, evid, csv_id, batch_size)
        else:
            print(f"Skipping incomplete pair: {base_filename}")

# Main function
def main():
    conn = connect_db()
    create_tables(conn)

    directories = {
        'mars': './space_apps_2024_seismic_detection/data/mars/test/data',
        'lunar': './space_apps_2024_seismic_detection/data/lunar/test/data'
    }

    batch_size = 100000

    for body, directory in directories.items():
        print(f"Processing body: {body}")
        process_directory(directory, conn, body, batch_size)

    conn.close()

if __name__ == '__main__':
    main()
