import axios from "axios";

const tmdbApi = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
    language: "en-US",
  },
});

const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

const getCache = (key) => {
  try {
    const cached = sessionStorage.getItem(key);

    if (!cached) {
      return null;
    }

    const parsedCache = JSON.parse(cached);

    const isExpired = Date.now() - parsedCache.timestamp > CACHE_TIME;

    if (isExpired) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsedCache.data;
  } catch (error) {
    console.error("Cache read error:", error);
    return null;
  }
};

const setCache = (key, data) => {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      }),
    );
  } catch (error) {
    console.error("Cache save error:", error);
  }
};

const fetchWithCache = async (cacheKey, request) => {
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return {
      data: cachedData,
      fromCache: true,
    };
  }

  const response = await request();

  setCache(cacheKey, response.data);

  return {
    data: response.data,
    fromCache: false,
  };
};

export const getPopularMovies = () => {
  return fetchWithCache("tmdb_popular", () => tmdbApi.get("/movie/popular"));
};

export const getNowPlayingMovies = () => {
  return fetchWithCache("tmdb_now_playing", () =>
    tmdbApi.get("/movie/now_playing"),
  );
};

export const getTopRatedMovies = () => {
  return fetchWithCache("tmdb_top_rated", () =>
    tmdbApi.get("/movie/top_rated"),
  );
};

export const getUpcomingMovies = () => {
  return fetchWithCache("tmdb_upcoming", () => tmdbApi.get("/movie/upcoming"));
};

export const getHindiMovies = () => {
  return fetchWithCache("tmdb_hindi", () =>
    tmdbApi.get("/discover/movie", {
      params: {
        with_original_language: "hi",
        sort_by: "popularity.desc",
      },
    }),
  );
};

export const getEnglishMovies = () => {
  return fetchWithCache("tmdb_english", () =>
    tmdbApi.get("/discover/movie", {
      params: {
        with_original_language: "en",
        sort_by: "popularity.desc",
      },
    }),
  );
};

export const getMoviesByGenre = (genreId) => {
  return fetchWithCache(`tmdb_genre_${genreId}`, () =>
    tmdbApi.get("/discover/movie", {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
      },
    }),
  );
};

export const searchMovies = (query) => {
  const cleanQuery = query.trim();

  const cacheKey = `tmdb_search_${cleanQuery.toLowerCase()}`;

  return fetchWithCache(cacheKey, () =>
    tmdbApi.get("/search/movie", {
      params: {
        query: cleanQuery,
      },
    }),
  );
};

export const getMovieDetails = (movieId) => {
  return tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos,credits",
    },
  });
};
// search
