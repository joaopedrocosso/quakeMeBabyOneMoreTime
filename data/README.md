# README for CSV and MSEED Data Importer

This project provides a Python script that imports CSV and MSEED files into a PostgreSQL database. It creates necessary tables and processes files from the directories specified in the configuration.

## Requirements

1. **Python 3.8+**
2. **PostgreSQL Database**
3. **Pipenv** for managing virtual environments and dependencies.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime.git
   cd quakeMeBabyOneMoreTime/data
   ```

2. Install dependencies using Pipenv:
   ```
   pipenv install
   ```

3. Activate the Pipenv environment:
   ```
   pipenv shell
   ```

4. Install PostgreSQL and ensure the database is running.

## .env Configuration

You need to create a `.env` file in the root directory of the project with the following environment variables:

```
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_PORT=your_database_port
```

## Usage

1. Once the `.env` file is configured, run the script:
   ```
   python run.py
   ```

2. The script will process all CSV and MSEED files from the specified directories and insert them into the PostgreSQL database.

## Explanation of Functions

- **connect_db**: Establishes a connection to the PostgreSQL database using environment variables.
- **create_tables**: Creates two tables (`data` and `catalog`) in the database if they don't exist.
- **batch_insert**: Efficiently inserts data into the database in batches using `psycopg2`'s `execute_values`.
- **process_csv**: Reads and processes CSV files, mapping columns and inserting data into the `data` table in batches.
- **process_mseed**: Reads MSEED files using the `obspy` library, extracts metadata, and inserts it into the `catalog` table.
- **process_directory**: Recursively processes all CSV and MSEED files in the given directory.
- **main**: The main function that connects to the database, creates tables, and processes the directories containing the files.

## Directories

The script processes the following directories:

- `./space_apps_2024_seismic_detection/data/mars/training/catalogs`
- `./space_apps_2024_seismic_detection/data/mars/training/data`
- `./space_apps_2024_seismic_detection/data/lunar/training/catalogs`
- `./space_apps_2024_seismic_detection/data/lunar/training/data`