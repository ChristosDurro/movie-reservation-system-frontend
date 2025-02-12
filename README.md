# Movie Reservation System - Frontend

## Overview
The **Frontend** of the Movie Reservation System provides users with an interactive and user-friendly interface to browse movies, select seats, and make reservations. It communicates with the backend microservices via API requests.

## Features
- User authentication and JWT-based authorization.
- Browse available movies and schedules.
- Select seats and make reservations.
- Responsive design for desktop and mobile users.
- Secure API communication with backend services.

## Technologies Used
- **React (Vite)** – JavaScript library for building user interfaces.
- **JavaScript (ES6+)** – Core language for frontend logic.
- **HTML5 & CSS3** – Structure and styling of the application.
- **Fetch** – For making HTTP requests to backend APIs.
- **React Router** – For client-side routing.
- **FontAwesome** – For icons.

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ChristosDurro/movie-reservation-system-frontend.git
   ```
2. Navigate to the project folder:
   ```bash
   cd movie-reservation-system-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables in `.env`:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8080
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---
This frontend is part of the **Movie Reservation System**, designed to showcase a microservices-based architecture with React and Spring Boot.

