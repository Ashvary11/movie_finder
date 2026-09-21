import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
       
        <Link to="/" className="text-2xl font-bold text-red-600">
          MOVIE-FINDER
        </Link>

       
        <form onSubmit={handleSearch} className="flex flex-1 justify-end gap-2">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
            className="w-full max-w-md rounded bg-gray-800 px-4 py-2 text-sm text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-600"
          />

          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
