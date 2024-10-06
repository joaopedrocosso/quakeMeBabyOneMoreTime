# Seismic Data Importer

This project is designed to import seismic data from CSV and MSEED files into a PostgreSQL database. It handles the creation of tables, batch processing of files, and parallel execution to optimize performance. The script processes files for two types of bodies: `Mars` and `Lunar`.

## Features
- **Automatic Table Creation**: Ensures that the necessary tables (`data` and `catalog`) are created if they don't exist.
- **Batch Processing**: Files are processed in batches to handle large datasets efficiently.
- **Parallel Execution**: The script uses multithreading to process multiple files concurrently.
- **Progress Monitoring**: Shows progress for file processing.
- **Memory Optimization**: Incorporates garbage collection to manage memory efficiently during processing.

## Setup

### 1. Prerequisites
Ensure you have the following installed:
- Python 3.8+
- PostgreSQL
- Pipenv

### 2. Install Dependencies
Clone this repository and run the following command to install dependencies:

```bash
pipenv install
```

### 3. Environment Variables
You need to set up environment variables in a `.env` file at the root of your project. The `.env` file should contain the following variables:

```
DB_HOST=your_postgresql_host
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_PORT=your_postgresql_port
```

### 4. Activating the Virtual Environment
Activate the Pipenv virtual environment using the following command:

```bash
pipenv shell
```

## How to Run
Once the environment is set up and activated, run the main script to start the data import process:

```bash
python main.py
```

## Key Points of the Script
- **Table Creation**: The script checks if the required tables (`data` and `catalog`) exist and creates them if necessary.
- **CSV and MSEED Processing**: The script processes both CSV and MSEED files, inserting the data into respective tables.
- **Parallel Processing**: Uses up to 4 threads for concurrent file processing, improving the overall performance.
- **Batch Insertions**: Handles large datasets by splitting them into batches, reducing the load on the database and improving memory management.

## File Structure
The script processes files located in specific directories:
- `mars`: Data related to Mars seismic activities.
- `lunar`: Data related to Lunar seismic activities.

Each body type has its corresponding directory where CSV and MSEED files are stored.

## Performance Optimization
- **Batch Size**: Files are processed in batches of 100,000 records to optimize memory usage and database performance.
- **Garbage Collection**: The script uses garbage collection to free memory after processing each batch, preventing memory leaks.