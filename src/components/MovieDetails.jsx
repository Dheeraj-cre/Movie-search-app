const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn">✖</button>

        <h2>{movie.Title}</h2>

        <p className="rating">⭐ {movie.imdbRating} / 10</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p className="plot">{movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
