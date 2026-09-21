import { useEffect, useState } from "react";
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
  }, [category]);

  const loadMoreMovies = async () => {
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
  };

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
  }, [page, loadingMore, hasMore]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>

          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{currentCategory.title}</h1>

          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Back Home
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-gray-400">No movies found.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {loadingMore && (
              <p className="text-center text-gray-400 py-8">
                Loading more movies...
              </p>
            )}

            {!hasMore && (
              <p className="text-center text-gray-400 py-8">No more movies.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCategory;
