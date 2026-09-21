import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";

import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getHindiMovies,
  getEnglishMovies,
} from "../api/tmdb";

function Home() {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [hindiMovies, setHindiMovies] = useState([]);
  const [englishMovies, setEnglishMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const [
          popularResponse,
          nowPlayingResponse,
          topRatedResponse,
          upcomingResponse,
          hindiResponse,
          englishResponse,
        ] = await Promise.all([
          getPopularMovies(),
          getNowPlayingMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getHindiMovies(),
          getEnglishMovies(),
        ]);

        setPopular(popularResponse.data.results || []);
        setNowPlaying(nowPlayingResponse.data.results || []);
        setTopRated(topRatedResponse.data.results || []);
        setUpcoming(upcomingResponse.data.results || []);
        setHindiMovies(hindiResponse.data.results || []);
        setEnglishMovies(englishResponse.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-bold">Discover Movies</h1>

        {loading ? (
          <p className="text-gray-400">Loading movies...</p>
        ) : (
          <>
            <MovieRow title="Popular" movies={popular} />

            <MovieRow title="Now Playing" movies={nowPlaying} />

            <MovieRow title="Top Rated" movies={topRated} />

            <MovieRow title="Upcoming" movies={upcoming} />

            <MovieRow title="Hindi Movies" movies={hindiMovies} />

            <MovieRow title="English Movies" movies={englishMovies} />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
