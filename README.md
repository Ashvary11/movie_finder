# 🎬 Movie Discovery App

A responsive movie discovery web application built with **React** and the **TMDB API**.

The app allows users to discover popular, upcoming, top-rated, Hindi, English, and genre-based movies. Users can also search for movies and view detailed information about individual movies.

---

## 🚀 Features

### 🏠 Home Page

- Featured movie hero section
- Popular Movies
- Now Playing Movies
- Top Rated Movies
- Upcoming Movies
- Hindi Movies
- English Movies
- Horizontal movie rows
- Clickable movie section headings

### 🎭 Genre Discovery

Browse movies by genre:

- Action
- Comedy
- Drama
- Horror
- Sci-Fi

Each genre has its own dedicated page.

### 📚 Movie Category Pages

Dedicated pages are available for:

- Popular Movies
- Now Playing
- Top Rated
- Upcoming
- Hindi Movies
- English Movies

Movies are displayed in a responsive grid layout.###

♾️ Infinite Scroll

Category and genre pages use infinite scrolling.

Instead of traditional pagination, new movies are automatically loaded when the user reaches near the bottom of the page.

### 🔎 Movie Search

Users can search for movies using the TMDB search API.

### 🎬 Movie Details

Each movie has a dedicated details page containing information such as:

- Movie poster
- Backdrop
- Title
- Overview
- Release date
- Rating
- Genres
- Cast
- Trailer / Videos
- Similar movies

### ⚡ API Caching

The application uses `sessionStorage` to cache API responses for **30 minutes**.

Pages are cached separately, for example:

`tmdb_popular_page_1`

`tmdb_popular_page_2`

`tmdb_genre_28_page_1`

`tmdb_genre_28_page_2`

This helps reduce unnecessary API requests and improves the experience when revisiting previously loaded pages.

---

## 🛠️ Tech Stack

### Frontend

- React 19
- JavaScript
- JSX
- Tailwind CSS

### Routing

- React Router

### API

- TMDB API
- Axios

### Storage

- Browser `sessionStorage` for API caching

---

## 📁 Project Structure

src/
│
├── api/
│ └── tmdb.js
│
├── components/
│ ├── Navbar.jsx
│ ├── MovieCard.jsx
│ ├── MovieRow.jsx
│ ├── Hero.jsx
│ └── Footer.jsx
│
├── pages/
│ ├── SearchResults.jsx
│ ├── MovieDetails.jsx
│ ├── GenreMovies.jsx
│ └── MovieCategory.jsx
│
├── App.js
└── index.js

---

## 🔀 Routes

| Route               | Description     |
| ------------------- | --------------- |
| `/`                 | Home page       |
| `/movie/:id`        | Movie details   |
| `/search`           | Search results  |
| `/genre/:genreId`   | Movies by genre |
| `/movies/:category` | Movie category  |

### Category Examples

`/movies/popular`

`/movies/now-playing`

`/movies/top-rated`

`/movies/upcoming`

`/movies/hindi`

`/movies/english`

### Genre Examples

`/genre/28` → Action

`/genre/35` → Comedy

`/genre/18` → Drama

`/genre/27` → Horror

`/genre/878` → Sci-Fi

---

## ⚙️ Getting Started

### 1. Clone the repository

````bash
git clone YOUR_REPOSITORY_URL
cd your-project-name
npm install

````
### Environment Variables


Create a `.env` file in the project root:


REACT_APP_TMDB_API_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_KEY=YOUR_TMDB_API_KEY

```env
npm start
```




## 📡 TMDB API

This project uses the **TMDB API** to retrieve movie information.

The application uses endpoints for:

- Popular movies
- Now playing
- Top rated
- Upcoming
- Movie discovery
- Genre discovery
- Search
- Movie details
- Similar movies

---

## 👨‍💻 Author

**Ashvary Gidian**

Built as a React-based movie discovery project using the TMDB API.

---

## 📄 License

This project is for educational and personal project purposes.

Movie data and images are provided by **TMDB**.