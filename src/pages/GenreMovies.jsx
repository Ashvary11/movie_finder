import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { getMoviesByGenre } from "../api/tmdb";

const genreNames = {
  28: "Action",
  35: "Comedy",
  18: "Drama",
  27: "Horror",
  878: "Sci-Fi",
};

function GenreMovies() {
  const { genreId } = useParams();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const genreName = genreNames[genreId] || "Movies";

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        setLoading(true);

        const response = await getMoviesByGenre(genreId, 1);

        setMovies(response.data.results || []);
        setPage(1);

        setHasMore(response.data.page < response.data.total_pages);
      } catch (error) {
        console.error("Genre movies error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genreId]);

  const loadMoreMovies = async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      console.log("Fetching genre page:", nextPage);

      const response = await getMoviesByGenre(genreId, nextPage);

      setMovies((previousMovies) => [
        ...previousMovies,
        ...(response.data.results || []),
      ]);

      setPage(nextPage);

      setHasMore(response.data.page < response.data.total_pages);
    } catch (error) {
      console.error("Error loading more genre movies:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Throttle scroll
  useEffect(() => {
    let lastScrollTime = 0;

    const handleScroll = () => {
      const currentTime = Date.now();

      // Wait 500ms between scroll checks
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

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{genreName} Movies</h1>

            <p className="mt-2 text-gray-400">
              Explore popular {genreName.toLowerCase()} movies
            </p>
          </div>

          <Link
            to="/"
            className="rounded bg-gray-800 px-4 py-2 text-sm transition hover:bg-gray-700"
          >
            Back Home
          </Link>
        </div>

        {loading && (
          <p className="text-gray-400">Loading {genreName} movies...</p>
        )}

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

export default GenreMovies;
