import { useState } from "react";
import { Link } from "react-router-dom";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
];

function GenreMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-gray-300 transition hover:text-white"
      >
        Genres ▾
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-44 rounded-md border border-gray-800 bg-[#181818] py-2 shadow-xl">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreMenu;
