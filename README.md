
# Cinema Booking App

A full-stack cinema booking web application that lets users browse movies, read details, make reservations, select seats, order food, and manage their user accounts. This app uses **Vue.js** on the frontend, **Node.js** with **Express** on the backend, and **MongoDB Atlas** as the database.

## Features

- **User Authentication**: Users can register and log in to manage reservations. (ToDo)
- **Movie Search and Details**: Users can search for movies, view synopses, and read reviews. (ToDo)
- **Seat Selection**: Dynamic seat selection for movie reservations. (missing backend)
- **Food Ordering**: Add food items like popcorn, soda, and candy to the order. (same)
- **Admin-Friendly**: Automatically pulls movie data daily when the server starts.

## Project Structure

```bash
.
.
├── .env                      # Environment variables
├── .gitignore
├── README.md                 # Project documentation

# Frontend
├── client/cinema-client                    # Renamed for clarity
│   ├── cinema-client
│   │   ├── .gitignore
│   │   ├── babel.config.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   └── vue.config.js
│   │
│   │── public                # Public assets
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── images            # Food and logo images
│   │    
│   │
│   └── src
│       ├── App.vue           # Main app component
│       ├── main.js           # Entry file for Vue
│       │
│       ├── assets            # Dynamic component assets
│       │   └── food          # Organize food images specifically
│       │
│       ├── components        # All reusable components
│       │   ├── FoodOrder.vue
│       │   ├── Login.vue
│       │   ├── MovieCard.vue
│       │   ├── MovieDetails.vue
│       │   ├── MovieList.vue
│       │   ├── Register.vue
│       │   └── SeatSelection.vue
│       │
│       ├── router            # Vue Router configuration
│       │   └── index.js
│       │
│       └── views             # Main views (pages)
│           ├── Home.vue
│           ├── Movie.vue
│           └── Reservation.vue

# Backend
└── server
    ├── server.js             # Main server entry
    ├── fetchMovies.js        # Movie fetching script
    │
    ├── models                # Mongoose models
    │   ├── Movie.js
    │   ├── RequestLog.js     # Log model to track requests
    │   ├── Reservation.js
    │   └── User.js
    │
    ├── routes                # Express route handlers
    │   ├── movies.js         # Routes for movie data
    │   └── reservations.js   # Routes for reservations
    │
    └── controllers           # Controllers for business logic (ToDo)
        ├── movieController.js
        └── reservationController.js

```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB Atlas** (or local MongoDB instance)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Adri-dou/Cinema-Booking-App
   cd Cinema-Booking-App
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the project root to store your MongoDB URI.

   ```bash
    # .env
    MONGODB_URI='your_mongodb_uri'
    TMDB_API_KEY=your_tmdb_key
    PORT=5000
   ```

3. **Install Dependencies**:

   - **Server**:
     ```bash
     npm install
     ```

   - **Client**:
     ```bash
     cd client/cinema-client
     npm install
     ```

4. **Running the Server**:
   The server will automatically fetch movies from the API if it hasn't done so on the current day.

   ```bash
   node server/server.js
   ```

5. **Running the Frontend**:
   Open a new terminal window, navigate to `frontend`, and start the Vue app.

   ```bash
   cd client/cinema-client
   npm run serve
   ```

6. **Access the App**:
   Visit `http://localhost:8080` in your browser to start using the application.

## Frontend Components

### Key Vue Components

1. **Home.vue**: Displays the list of available movies.
2. **MovieDetails.vue**: Shows details about a selected movie.
3. **FoodOrder.vue**: Allows users to order food items.
4. **SeatSelection.vue**: Lets users choose seats for a movie showing.
5. **Login.vue / Register.vue**: User authentication components.

## Backend Structure

The backend is powered by **Express** with the following setup:

- **server.js**: The main server file, handling routes and database connections.
- **fetchMovies.js**: Script that fetches movies from an external API to populate MongoDB if there are no movies added today.

### API Endpoints

| Endpoint           | Method | Description                    |
|--------------------|--------|--------------------------------|
| `/api/movies`      | GET    | Fetch all movies              |
| `/api/movies/:id`  | GET    | Fetch a specific movie        |
| `/api/user/login`  | POST   | User login                    |
| `/api/user/register` | POST | User registration             |

