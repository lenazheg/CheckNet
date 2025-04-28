# Candidate Management App

This is a full-stack application for managing candidates, built using **React** on the front-end and **Node.js** with **Express** for the back-end. The application allows users to input candidate details and view a list of candidates. The data is stored in a PostgreSQL database, and the app interacts with the OpenAI API to process candidates.

## Features

- **Add a Candidate**: Input a candidate's name, email, and keywords.
- **View Candidates**: List all the candidates added to the system.
- **API Integration**: Interacts with the OpenAI API to process candidate data.

## Tech Stack

- **Frontend**: React, JavaScript, CSS (Custom Styling)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **API**: OpenAI API (for processing candidates)

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** and **npm** (for the backend)
- **Docker** (for managing containers)
- **PostgreSQL** (for the database, or Docker can handle this as well)

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/lenazheg/CheckNet.git
cd CheckNet

### 2. Set up the backend

Navigate to the backend directory:

`cd backend`

Install dependencies:

`npm install`

Set environment variables:

OPENAI_API_KEY: Your API key for OpenAI (Paste it in .env in the backed and docker-composer.yml in the root)

### 3. Set up the frontend

Navigate to the frontend directory:

`cd ../frontend`

Install dependencies:

`npm install`

### 4. DB

You don't need to manually create the table in the database — a script automatically handles the table creation when Docker starts the container.

### 5. Run with Docker

This project using Docker to run both the frontend, backend, and PostgreSQL database:

From the project root directory, run the following to start everything:

`docker-compose up --build`

This will build and start the containers for PostgreSQL, backend, and frontend.

The backend will be available at http://localhost:5000.

The frontend will be available at http://localhost:3000.

### Endpoints

`POST /api/processCandidate`: To process a new candidate. Requires name, email, and keywords in the request body.

`GET /api/candidates`: To retrieve a list of all candidates.

`PUT /api/candidate/:id/refresh`: To refresh candidates summary and save to DB.

### Notes

I implemented OpenAI integration, but since I didn't have available credits, I added a fallback mock generator for the summery.

### Contribution

Feel free to open issues and submit pull requests if you want to contribute to the project!

### License

MIT License
