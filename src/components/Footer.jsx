export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10 text-gray-400">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-xl font-bold text-red-600"> MOVIE-FINDER </h2>
        <p className="mt-3 text-sm">
          Discover movies, explore ratings, and find your next favorite film.
        </p>
        <p className="mt-5 text-xs text-gray-500">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p className="mt-4 text-xs text-gray-600">
          © {new Date().getFullYear()} Movie-Finder by Ashvary
        </p>
      </div>
    </footer>
  );
}
