import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMovieDetails, getSimilarMovies } from "../api/tmdb";
import MovieRow from "../components/MovieRow";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMovieDetails(id);
        setMovie(response.data);

        const similarResponse = await getSimilarMovies(id);
        setSimilarMovies(similarResponse.data.results || []);
      } catch (error) {
        console.error("Movie details error:", error);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-gray-400">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#141414] text-white">
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-lg bg-[#1f1f1f] p-8 text-center">
            <h1 className="text-2xl font-bold">Movie Not Found</h1>

            <p className="mt-3 text-gray-400">
              {error || "We couldn't find this movie."}
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
            >
              Back Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";

  const videos = movie.videos?.results || [];

  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ||
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ||
    videos.find((video) => video.site === "YouTube" && video.type === "Teaser");

  const cast = movie.credits?.cast?.slice(0, 8) || [];

  const directors =
    movie.credits?.crew?.filter((person) => person.job === "Director") || [];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[75vh] overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Left gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#141414] to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl items-end px-6 pb-12 pt-20">
          <div className="flex w-full flex-col gap-8 md:flex-row md:items-end">
            {/* Poster */}
            {posterUrl && (
              <div className="hidden w-56 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl md:block lg:w-64">
                <img src={posterUrl} alt={movie.title} className="w-full" />
              </div>
            )}

            {/* Movie information */}
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-3 text-lg italic text-gray-300">
                  "{movie.tagline}"
                </p>
              )}

              {/* Metadata */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <span className="font-semibold text-yellow-400">
                  ⭐ {rating}
                </span>

                <span>{releaseYear}</span>
                <span>{runtime}</span>

                {movie.original_language && (
                  <span className="rounded border border-gray-500 px-2 py-1 uppercase">
                    {movie.original_language}
                  </span>
                )}

                {movie.status && (
                  <span className="rounded border border-gray-500 px-2 py-1">
                    {movie.status}
                  </span>
                )}
              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-200"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base">
                {movie.overview || "No overview available."}
              </p>

              {/* Actions */}
              <div className="mt-7 flex flex-wrap gap-3">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
                  >
                    ▶ Watch Trailer
                  </a>
                )}

                <Link
                  to="/"
                  className="rounded bg-white/10 px-5 py-3 font-semibold transition hover:bg-white/20"
                >
                  ← Back Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <main className="mx-auto max-w-7xl px-6 pb-16">
        {/* Quick information */}
        <section className="grid grid-cols-2 gap-4 border-b border-white/10 py-10 sm:grid-cols-3 lg:grid-cols-6">
          <InfoItem label="Rating" value={`${rating}/10`} />

          <InfoItem
            label="Votes"
            value={movie.vote_count?.toLocaleString() || "N/A"}
          />

          <InfoItem label="Release" value={movie.release_date || "N/A"} />

          <InfoItem label="Runtime" value={runtime} />

          <InfoItem
            label="Language"
            value={movie.original_language?.toUpperCase() || "N/A"}
          />

          <InfoItem
            label="Popularity"
            value={movie.popularity ? movie.popularity.toFixed(0) : "N/A"}
          />
        </section>

        {/* Director */}
        {directors.length > 0 && (
          <section className="py-10">
            <h2 className="mb-5 text-2xl font-bold">Director</h2>

            <div className="flex flex-wrap gap-3">
              {directors.map((director) => (
                <div
                  key={director.credit_id}
                  className="rounded-lg bg-[#1f1f1f] px-5 py-4"
                >
                  <p className="font-semibold">{director.name}</p>

                  <p className="mt-1 text-sm text-gray-400">Director</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <section className="py-10">
            <h2 className="mb-6 text-2xl font-bold">Cast</h2>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
              {cast.map((person) => {
                const profileUrl = person.profile_path
                  ? `${IMAGE_BASE_URL}w185${person.profile_path}`
                  : null;

                return (
                  <div
                    key={person.credit_id}
                    className="overflow-hidden rounded-lg bg-[#1f1f1f]"
                  >
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt={person.name}
                        className="aspect-[2/3] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] items-center justify-center bg-gray-800 text-sm text-gray-500">
                        No Image
                      </div>
                    )}

                    <div className="p-3">
                      <p className="truncate font-semibold">{person.name}</p>

                      <p className="mt-1 truncate text-sm text-gray-400">
                        {person.character || "Unknown role"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Production information */}
        {(movie.production_companies?.length > 0 ||
          movie.production_countries?.length > 0) && (
          <section className="grid gap-10 border-t border-white/10 py-10 md:grid-cols-2">
            {/* Production companies */}
            {movie.production_companies?.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-bold">Production</h2>

                <div className="space-y-4">
                  {movie.production_companies.slice(0, 5).map((company) => (
                    <div
                      key={company.id}
                      className="rounded-lg bg-[#1f1f1f] p-4"
                    >
                      <p className="font-semibold">{company.name}</p>

                      {company.origin_country && (
                        <p className="mt-1 text-sm text-gray-400">
                          {company.origin_country}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Countries */}
            {movie.production_countries?.length > 0 && (
              <div>
                <h2 className="mb-5 text-2xl font-bold">
                  Production Countries
                </h2>

                <div className="flex flex-wrap gap-3">
                  {movie.production_countries.map((country) => (
                    <span
                      key={country.iso_3166_1}
                      className="rounded bg-[#1f1f1f] px-4 py-2 text-sm"
                    >
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Trailer */}
        {trailer && (
          <section className="border-t border-white/10 py-10">
            <h2 className="mb-6 text-2xl font-bold">Trailer</h2>

            {/* <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div> */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <img
                src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
                alt={`${movie.title} trailer`}
                className="h-full w-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* YouTube button */}
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Watch ${movie.title} trailer on YouTube`}
              >
                <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-red-600 transition hover:scale-110 hover:bg-red-700">
                  <span className="ml-1 text-3xl text-white">▶</span>
                </div>
              </a>
            </div>

            {similarMovies.length > 0 && (
              <section className="border-t border-white/10 py-10">
                <MovieRow title="More Like This" movies={similarMovies} />
              </section>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg bg-[#1f1f1f] p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 truncate font-semibold text-gray-200">{value}</p>
    </div>
  );
}

export default MovieDetails;
