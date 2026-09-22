import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import GenreMovies from "./pages/GenreMovies";
import MovieCategory from "./pages/MovieCategory";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/genre/:genreId" element={<GenreMovies />} />
        <Route path="/movies/:category" element={<MovieCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
