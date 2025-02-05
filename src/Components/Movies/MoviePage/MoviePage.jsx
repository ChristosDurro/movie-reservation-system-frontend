/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import "./MoviePage.css";
import { useEffect, useState } from "react";
import ScheduleCard from "../ScheduleCard/ScheduleCard";

const MoviePage = ({loggedIn}) => {
	const { id, title } = useParams();
	const [movie, setMovie] = useState(null);
	const [schedules, setSchedules] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchMovie = (id) => {
			fetch(`http://localhost:8080/movies/${id}`)
				.then((res) => res.json())
				.then((data) => setMovie(data))
				.catch((error) => {
					setErrorMessage("Something went wrong. Please try again!");
					console.log(error);
				});
		};

		const fetchSchedules = (movieId) => {
			fetch(`http://localhost:8082/schedules/movie/${movieId}`)
				.then((res) => res.json())
				.then((data) => setSchedules(data))
				.catch((error) => console.log(error));
		};

		fetchMovie(id);
		fetchSchedules(id);
	}, []);

	const handleScheduleLink = (e) => {
		if (!loggedIn) {
			e.preventDefault();
			alert("You need to log in to continue!");
			navigate("/login");
		}
	}

	return (
		<div className="movie-page-container">
			{errorMessage !== null ? (
				<p className="error-message">{errorMessage}</p>
			) : movie ? (
				<div className="movie-info-display">
					<div className="movie-page-display">
						<div className="movie-page-info">
							<h1 className="movie-page-title">{movie.title}</h1>
							<p className="movie-page-desc">
								{movie.description}
							</p>
							<div className="movie-genre-info">
								<p className="movie-page-genre-text">Genres:</p>
								<ul className="movie-page-genres">
									{movie.genres.map((genre) => {
										return (
											<li
												key={genre.id}
												className="movie-page-genre"
											>
												{genre.name}
											</li>
										);
									})}
								</ul>
							</div>
							<div className="movie-page-release">
								Release Date: {movie.releaseDate}
							</div>
							<div className="movie-page-duration">
								Duration: {movie.duration} min
							</div>
						</div>
						<div className="movie-page-img">
							<img src={movie.image} alt={movie.title} />
						</div>
					</div>

					<hr />

					<div className="movie-page-showtimes">
						<h1 className="showtimes-header">Movie Showtimes:</h1>
						<ul className="showtimes-list">
							{schedules !== null && schedules.map((schedule) => {
								return (
									<Link
										key={schedule.id}
										to={`/movies/${movie.title.toLowerCase()}/${schedule.id}/tickets`}
										className="schedule-link"
										onClick={handleScheduleLink}
									>
										<ScheduleCard schedule={schedule} />
									</Link>
								);
							})}
						</ul>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default MoviePage;
