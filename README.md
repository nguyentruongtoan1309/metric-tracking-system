# metric-tracking-system

A metric tracking system that support different units for distance and temperature.

# Postman collection

- File: **Metric Tracking System.postman_collection.json**

# Usage

## Local

1. Install dependencies
   ```bash
   npm install
   ```
2. Create .env
   - Copy file .env.example
   - Run Postgre DB local and update environments
3. Run application
   ```bash
   npm start
   ```
4. Access Swagger API docs: http://localhost:5000/api/v1/docs

## Docker

1. Create .env
   - Copy file .env.example
   - Update environments
2. Run docker compose
   ```bash
   docker compose up -d --build
   ```
3. Access Swagger API docs: http://localhost:5000/api/v1/docs
