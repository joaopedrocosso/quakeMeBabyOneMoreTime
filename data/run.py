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
