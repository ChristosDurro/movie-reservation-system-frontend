/* eslint-disable react/prop-types */
import "./MovieCard.css"

const MovieCard = ({movie}) => {

  const {id, duration, releaseDate, image, title, description, premiereDate, lastShowing, genres} = movie;

  return (
	<div className="movie-card">
    <img src={image} alt={title} />
    <h1 className="movie-title">{title}</h1>
    <ul className="movie-genres">
      {
        genres.map((genre) => {
          return <li key={genre.id} className="genre">{genre.name}</li>
        })
      }
    </ul>
    <p className="movie-desc">{description}</p>
    <div className="movie-info">
      <span className="movie-release">{releaseDate}</span>
      <span className="movie-duration">{duration} mins</span>
    </div>
  </div>
  )
}

export default MovieCard