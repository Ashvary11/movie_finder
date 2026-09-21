import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-red-600">
          MOVIE-VERSE
        </Link>

        <Link
          to="/"
          className="text-sm text-gray-300 transition hover:text-white"
        >
          Search
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
