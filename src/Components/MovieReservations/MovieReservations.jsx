/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./MovieReservations.css";
import MovieReservationCard from "./MovieReservationCard/MovieReservationCard";

const MovieReservations = ({ user }) => {
	const [ticketReservations, setTicketReservations] = useState([]);

	useEffect(() => {
		const fetchReservations = (userId) => {
			const token = localStorage.getItem("token");

			if (token == null) {
				alert("Unathorized access. Please login before procceeding!");
				window.location.href = "/login";
				return;
			}

			fetch(`http://localhost:8086/reservations/${userId}`, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					console.log(res);

					if (res.status == 401) {
						localStorage.removeItem("user");
						localStorage.removeItem("token");

						alert("Token expired. Please login again!");
						window.location.href = "/login";
						return Promise.reject("Token Expired");
					}

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

	return (
		<div className="movie-reservations-container">
			<h1 className="movie-reserv-header">Movie Reservations</h1>
			<ul className="movie-reserv-display">
				{ticketReservations && ticketReservations.map((reservation, i) => {
					return (
						<MovieReservationCard
							key={i}
							reservation={reservation}
							setTicketReservations={setTicketReservations}
							userId={user.id}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default MovieReservations;
