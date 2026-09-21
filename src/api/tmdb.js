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

// Movie Categories

export const getPopularMovies = (page = 1) => {
  return fetchWithCache(`tmdb_popular_page_${page}`, () =>
    tmdbApi.get("/movie/popular", {
      params: {
        page,
      },
    }),
  );
};

export const getNowPlayingMovies = (page = 1) => {
  return fetchWithCache(`tmdb_now_playing_page_${page}`, () =>
    tmdbApi.get("/movie/now_playing", {
      params: {
        page,
      },
    }),
  );
};

export const getTopRatedMovies = (page = 1) => {
  return fetchWithCache(`tmdb_top_rated_page_${page}`, () =>
    tmdbApi.get("/movie/top_rated", {
      params: {
        page,
      },
    }),
  );
};

export const getUpcomingMovies = (page = 1) => {
  return fetchWithCache(`tmdb_upcoming_page_${page}`, () =>
    tmdbApi.get("/movie/upcoming", {
      params: {
        page,
      },
    }),
  );
};

export const getHindiMovies = (page = 1) => {
  return fetchWithCache(`tmdb_hindi_page_${page}`, () =>
    tmdbApi.get("/discover/movie", {
      params: {
        page,
        with_original_language: "hi",
        sort_by: "popularity.desc",
      },
    }),
  );
};

export const getEnglishMovies = (page = 1) => {
  return fetchWithCache(`tmdb_english_page_${page}`, () =>
    tmdbApi.get("/discover/movie", {
      params: {
        page,
        with_original_language: "en",
        sort_by: "popularity.desc",
      },
    }),
  );
};

// Genres

export const getMoviesByGenre = (genreId, page = 1) => {
  return fetchWithCache(`tmdb_genre_${genreId}_page_${page}`, () =>
    tmdbApi.get("/discover/movie", {
      params: {
        page,
        with_genres: genreId,
        sort_by: "popularity.desc",
      },
    }),
  );
};

// Similar Movies

export const getSimilarMovies = (movieId) => {
  return fetchWithCache(`tmdb_similar_${movieId}`, () =>
    tmdbApi.get(`/movie/${movieId}/similar`),
  );
};

// Search

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

// Movie Details

export const getMovieDetails = (movieId) => {
  return fetchWithCache(`tmdb_movie_details_${movieId}`, () =>
    tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos,credits",
      },
    }),
  );
};
