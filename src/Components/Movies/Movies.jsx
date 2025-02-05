import { useEffect, useState } from "react";
import "./Movies.css";

import MovieCard from "./MovieCard/MovieCard";
import { Link } from "react-router-dom";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const getMovies = () => {
			fetch("http://localhost:8080/movies")
				.then((res) => {
					if (!res.ok) {
						setErrorMessage(
							"Something went wrong, please try again!"
						);
					}
					return res.json();
				})
				.then((data) => setMovies(data))
				.catch((error) => {
					setErrorMessage("Something went wrong, please try again!");
					console.log(error);
				});
		};

		getMovies();
	}, []);

	return (
		<div className="movie-container">
			<h1 className="movies-header">Movies Airing Right Now!</h1>
			<div className="movies-display">
				{errorMessage != null && movies.length == 0 ? (
					<p className="error-message">{errorMessage}</p>
				) : (
					movies.map((movie) => {
						return (
							<Link
								className="movie-card-link"
								key={movie.id}
								to={`/movies/${movie.id}/${movie.title.toLowerCase()}`}
							>
								<MovieCard movie={movie} />
							</Link>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Movies;
