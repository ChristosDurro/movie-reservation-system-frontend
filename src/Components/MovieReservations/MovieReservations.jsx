/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./MovieReservations.css";
import MovieReservationCard from "./MovieReservationCard/MovieReservationCard";

const MovieReservations = ({ user }) => {
	const [ticketReservations, setTicketReservations] = useState([]);

	useEffect(() => {
		const fetchReservations = (userId) => {
			fetch(`http://localhost:8085/reservations/${userId}`)
				.then((res) => {
					console.log(res);
					return res.json();
				})
				.then((data) => {
					console.log(data);
					setTicketReservations(data);
				})
				.catch((error) => console.log(error));
		};

		fetchReservations(user.id);
	}, []);

	console.log(user);

	return (
		<div className="movie-reservations-container">
			<h1 className="movie-reserv-header">Movie Reservations</h1>
			<ul className="movie-reserv-display">
				{
					ticketReservations.map((reservation, i) => {
						return <MovieReservationCard key={i} reservation={reservation} setTicketReservations={setTicketReservations} userId={user.id} />
					})
				}
			</ul>
		</div>
	);
};

export default MovieReservations;
