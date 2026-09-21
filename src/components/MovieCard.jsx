import { Link } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group min-w-[160px] max-w-[160px] flex-shrink-0"
    >
      <div className="overflow-hidden rounded-md bg-gray-800">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="h-[240px] w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-[240px] items-center justify-center bg-gray-800 text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      <h3 className="mt-2 truncate text-sm font-semibold">
        {movie.title}
      </h3>

      <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
        <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
        <span>{releaseYear}</span>
      </div>
    </Link>
  );
}

export default MovieCard;