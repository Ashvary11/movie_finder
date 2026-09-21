import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/tmdb";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }
      try {
        setLoading(true);
        const response = await searchMovies(query);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Search Results</h1>
            <p className="mt-2 text-gray-400">Results for "{query}"</p>
          </div>

          <Link
            to="/"
            className="rounded bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
          >
            Back Home
          </Link>
        </div>

        {loading && <p className="text-gray-400">Searching...</p>}

        {!loading && movies.length === 0 && (
          <p className="text-gray-400">No movies found.</p>
        )}

        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchResults;
