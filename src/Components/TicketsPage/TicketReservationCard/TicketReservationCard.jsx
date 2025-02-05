/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TicketReservationCard.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const TicketReservationCard = ({
	movie,
	formattedDateInfo,
	schedule,
	quantity,
	message,
	url,
	seatsSelected,
	seatsSelectedLen,
	user,
}) => {
	const navigate = useNavigate();

	const handleCheckout = (e) => {
		e.preventDefault();

		console.log("Checkout called");

		fetch("http://localhost:8084/create-checkout-session", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: user.id,
				movieId: movie.id,
				scheduleId: schedule.id,
				selectedSeatsIds: seatsSelected.map((seat) => seat.id),
				ticketQuantity: quantity,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.url) {
					window.location.href = data.url;
				} else
					alert(
						"Something went wrong. An error occured with checkout!"
					);
			})
			.catch((error) => {
				console.log(error);
				alert("Something went wrong. Please try again!");
			});
	};

	return (
		<div className="movie-ticket-display">
			<div className="movie-ticket-info">
				<div className="movie-ticket-img">
					<img src={movie?.image} alt={movie?.title} />
				</div>
				<p className="movie-ticket-title">{movie?.title}</p>
				<hr />
				<div className="movie-ticket-schedule">
					<p className="movie-ticket-date">
						{formattedDateInfo.dayString} {formattedDateInfo.day}{" "}
						{formattedDateInfo.monthString},{" "}
						{formattedDateInfo.formattedTime}
					</p>
				</div>
				<hr />
				<p className="movie-ticket-hall">{schedule?.hall}</p>
				<hr />

				{quantity > 0 && (
					<>
						<p className="movie-ticket-quantity">
							{quantity} {quantity > 1 ? "Tickets" : "Ticket"}
						</p>
						<hr />
						<p className="movie-ticket-sum">
							Total Cost: {(quantity * 9.5).toFixed(2)} €
						</p>
					</>
				)}
			</div>
			{message === "Checkout" ? (
				<button
					className={`movie-ticket-checkout-btn ${
						seatsSelectedLen === 0 ? "disabled" : ""
					}`}
					onClick={handleCheckout}
				>
					Checkout
					<FontAwesomeIcon
						className="arrow-right-btn"
						icon={faArrowRight}
					/>
				</button>
			) : (
				<Link
					to={url}
					className={`movie-ticket-checkout-btn ${
						quantity === 0 ? "disabled" : ""
					}`}
				>
					{message}
					<FontAwesomeIcon
						className="arrow-right-btn"
						icon={faArrowRight}
					/>
				</Link>
			)}
		</div>
	);
};

export default TicketReservationCard;
