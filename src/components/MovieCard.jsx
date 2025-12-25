const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card full-card">
      <div className="poster-wrapper">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
        />
      </div>

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p className="meta">
          {movie.Year} • {movie.Genre}
        </p>

        <p className="rating">⭐ {movie.imdbRating} / 10</p>

        <p className="plot">{movie.Plot}</p>

        <p className="actors">
          <strong>Actors:</strong> {movie.Actors}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
