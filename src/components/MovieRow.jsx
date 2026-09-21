import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies,link }) {
  return (
    <section className="mb-10">
      {/* <h2 className="mb-4 text-xl font-bold text-white">{title}</h2> */}
      {link ? (
        <Link
          to={link}
          className="text-2xl font-bold mb-4 inline-block hover:text-red-500 transition"
        >
          {title}
        </Link>
      ) : (
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      )}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
