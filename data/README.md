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
git