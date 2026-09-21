import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getHindiMovies,
  getEnglishMovies,
} from "../api/tmdb";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const categories = {
  popular: {
    title: "Popular Movies",
    fetchMovies: getPopularMovies,
  },
  "now-playing": {
    title: "Now Playing",
    fetchMovies: getNowPlayingMovies,
  },
  "top-rated": {
    title: "Top Rated Movies",
    fetchMovies: getTopRatedMovies,
  },
  upcoming: {
    title: "Upcoming Movies",
    fetchMovies: getUpcomingMovies,
  },
  hindi: {
    title: "Hindi Movies",
    fetchMovies: getHindiMovies,
  },
  english: {
    title: "English Movies",
    fetchMovies: getEnglishMovies,
  },
};

function MovieCategory() {
  const { category } = useParams();

  const currentCategory = categories[category];

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      if (!currentCategory) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await currentCategory.fetchMovies(1);

        setMovies(response.data.results);
        setPage(1);

        setHasMore(response.data.page < response.data.total_pages);
      } catch (error) {
        console.error("Error fetching category movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryMovies();
  }, [category, currentCategory]);

  const loadMoreMovies = useCallback(async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      console.log("Fetching page:", nextPage);

      const response = await currentCategory.fetchMovies(nextPage);

      setMovies((previousMovies) => [
        ...previousMovies,
        ...response.data.results,
      ]);

      setPage(nextPage);

      setHasMore(response.data.page < response.data.total_pages);
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, currentCategory]);

  // Throttle scroll event
  useEffect(() => {
    let lastScrollTime = 0;

    const handleScroll = () => {
      const currentTime = Date.now();

      // Run only once every 500ms
      if (currentTime - lastScrollTime < 500) {
        return;
      }

      lastScrollTime = currentTime;

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500;

      if (nearBottom) {
        loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loadingMore, hasMore, loadMoreMovies]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-[#141414] text-white">
        <Navbar />

        <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 py-8">
          <h1 className="mb-4 text-3xl font-bold">Category Not Found</h1>

          <Link
            to="/"
            className="rounded bg-gray-800 px-4 py-2 text-sm transition hover:bg-gray-700"
          >
            Back Home
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{currentCategory.title}</h1>

            <p className="mt-2 text-gray-400">
              Explore {currentCategory.title.toLowerCase()}
            </p>
          </div>

          <Link
            to="/"
            className="rounded bg-gray-800 px-4 py-2 text-sm transition hover:bg-gray-700"
          >
            Back Home
          </Link>
        </div>

        {loading && <p className="text-gray-400">Loading movies...</p>}

        {!loading && movies.length === 0 && (
          <p className="text-gray-400">No movies found.</p>
        )}

        {!loading && movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {loadingMore && (
              <p className="py-8 text-center text-gray-400">
                Loading more movies...
              </p>
            )}

            {!hasMore && (
              <p className="py-8 text-center text-gray-400">No more movies.</p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MovieCategory;
