import React from "react";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function Hero({ movie }) {
  if (!movie) {
    return null;
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}original${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-end overflow-hidden bg-black">
      {/* Backdrop */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-300 mb-4">
            <span className="text-yellow-400 font-semibold">⭐ {rating}</span>
            <span>{releaseYear}</span>
            <span className="border border-gray-400 px-2 py-0.5 rounded">
              HD
            </span>
          </div>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-4 mb-6">
            {movie.overview || "No overview available for this movie."}
          </p>

          <Link
            to={`/movie/${movie.id}`}
            className="inline-flex items-center bg-white text-black font-semibold px-5 py-2.5 rounded-md hover:bg-gray-200 transition"
          >
            ▶ View Details
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
