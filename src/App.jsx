import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌗 Theme state (default: dark)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const searchMovies = async (query) => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://omdbapi.com/?s=${encodeURIComponent(
          query
        )}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );
      const data = await res.json();

      if (data.Response !== "True") {
        setError(data.Error);
        setMovies([]);
        return;
      }

      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const detailRes = await fetch(
            `https://omdbapi.com/?i=${movie.imdbID}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
          );
          return await detailRes.json();
        })
      );

      setMovies(detailedMovies);
    } catch {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* 🌗 THEME TOGGLE BUTTON */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>🎬 Movie Search App</h1>

      <SearchBar onSearch={searchMovies} />

      {/* 🎥 OTT PLATFORM LOGOS */}
      <div className="platform-logos">
        <a href="https://www.netflix.com" target="_blank" rel="noreferrer">
          <img src="/logos/netflix.png" alt="Netflix" />
        </a>

        <a href="https://www.primevideo.com" target="_blank" rel="noreferrer">
          <img src="/logos/prime.png" alt="Amazon Prime Video" />
        </a>

        <a href="https://www.disneyplus.com" target="_blank" rel="noreferrer">
          <img src="/logos/disney.png" alt="Disney+" />
        </a>

        <a href="https://www.hotstar.com" target="_blank" rel="noreferrer">
          <img src="/logos/hotstar.png" alt="Hotstar" />
        </a>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <MovieList movies={movies} />
    </div>
  );
}

export default App;
