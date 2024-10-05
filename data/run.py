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
        """)
        conn.commit()
