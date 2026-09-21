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
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import GenreMenu from "../components/GenreMenu";

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

  const random20 = Math.floor(Math.random() * 10);
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      <Hero movie={popular[random20]} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Discover Movies</h1>

          <GenreMenu />
        </div>
        {loading ? (
          <p className="text-gray-400">Loading movies...</p>
        ) : (
          <>
            <MovieRow title="Popular" movies={popular} link="/movies/popular" />
            <MovieRow
              title="Now Playing"
              movies={nowPlaying}
              link="/movies/now-playing"
            />
            <MovieRow
              title="Top Rated"
              movies={topRated}
              link="/movies/top-rated"
            />
            <MovieRow
              title="Upcoming"
              movies={upcoming}
              link="/movies/upcoming"
            />
            <MovieRow
              title="Hindi Movies"
              movies={hindiMovies}
              link="/movies/hindi"
            />
            <MovieRow
              title="English Movies"
              movies={englishMovies}
              link="/movies/english"
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
