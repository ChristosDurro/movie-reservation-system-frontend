/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../Modal/Modal";
import "./MovieReservationCard.css";

const MovieReservationCard = ({
	reservation,
	setTicketReservations,
	userId,
}) => {
	const { movie, schedule, seat, ticketId } = reservation;
	const [openModal, setOpenModal] = useState(false);

	console.log(movie);
	console.log(schedule);
	console.log(seat);
	console.log(ticketId);

	const localDateTime = schedule.showtime;
	const date = new Date(localDateTime);

	const hour = date.getHours();
	const day = date.getDate();
	const month = date.getMonth();
	const minutes = date.getMinutes();

	const dayNames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const alphabet = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];

	const dayString = dayNames[date.getDay()];
	const monthString = monthNames[month];

	// Format hour and minutes to "HH:mm" format (e.g., "19:00")
	const formattedTime = `${hour}:${minutes < 10 ? "0" + minutes : minutes}`;

	const handleReservCancelClick = () => {
		setOpenModal(false);
		fetch("http://localhost:8085/reservation/cancel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: userId,
				movieId: movie.id,
				scheduleId: schedule.id,
				seatId: seat.id,
				ticketId: ticketId,
			}),
		})
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setTicketReservations(data.reservedMovies);
				localStorage.setItem("user", JSON.stringify(data.userDto));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="reservation-card">
			<div className="reserv-details">
				<div className="reserv-movie-details">
					<img src={movie.image} alt={movie.title} />
					<p className="reserv-movie-title">{movie.title}</p>
				</div>
				<hr />
				<p className="reserv-date">
					{dayString.substring(0, 3)} {day}{" "}
					{monthString.substring(0, 3)} {formattedTime}
				</p>
				<hr />
				<p className="reserv-seat-details">
					Seat: {alphabet[seat.seatRow]}-{seat.seatColumn}
				</p>
				<hr />
				<p className="reserv-ticket-details">Ticket ID: {ticketId}</p>
			</div>
			<button className="reserv-btn" onClick={() => setOpenModal(true)}>
				Cancel Reservation
			</button>
			{openModal && (
				<Modal
					setOpenModal={setOpenModal}
					handleReservCancelClick={handleReservCancelClick}
				/>
			)}
		</div>
	);
};

export default MovieReservationCard;
