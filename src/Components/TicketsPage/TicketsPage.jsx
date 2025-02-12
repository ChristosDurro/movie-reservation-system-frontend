/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TicketsPage.css";
import { useParams } from "react-router-dom";
import TicketReservationCard from "./TicketReservationCard/TicketReservationCard";

const TicketsPage = () => {
	const { scheduleId } = useParams();
	const [quantity, setQuantity] = useState(0);
	const [movie, setMovie] = useState(null);
	const [schedule, setSchedule] = useState(null);

	const [formattedDateInfo, setFormattedDateInfo] = useState({
		hour: "",
		day: "",
		dayString: "",
		monthString: "",
		formattedTime: "",
	});

	useEffect(() => {
		const fetchSchedule = (scheduleId) => {
			const token = localStorage.getItem("token");

			if (token == null) {
				alert("Unathorized access. Please login before procceeding!");
				window.location.href = "/login";
				return;
			}

			fetch(`http://localhost:8086/schedules/${scheduleId}`, {
				headers: {
					Authorization: `bearer ${token}`,
				},
			})
				.then((res) => {
					console.log(res);

					if (res.status == 401) {
						localStorage.removeItem("user");
						localStorage.removeItem("token");

						alert(
							"Token is invalid or expired. Please log in again!"
						);
						window.location.href = "/login";
						return Promise.reject("Token Expired.");
					}

					return res.json();
				})
				.then((data) => setSchedule(data))
				.catch((error) => console.log(error));
		};

		fetchSchedule(scheduleId);
	}, []);

	useEffect(() => {
		const fetchMovie = (movieId) => {
			fetch(`http://localhost:8086/movies/${movieId}`)
				.then((res) => res.json())
				.then((data) => setMovie(data))
				.catch((error) => console.log(error));
		};

		if (schedule) {
			fetchMovie(schedule.movieId);

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

			const dayString = dayNames[date.getDay()];
			const monthString = monthNames[month];

			// Format hour and minutes to "HH:mm" format (e.g., "19:00")
			const formattedTime = `${hour}:${
				minutes < 10 ? "0" + minutes : minutes
			}`;

			setFormattedDateInfo({
				hour,
				day,
				dayString,
				monthString,
				formattedTime,
			});
		}
	}, [schedule]);

	const handleDecreaseBtn = () => {
		setQuantity((prevQuantity) =>
			prevQuantity > 0 ? prevQuantity - 1 : 0
		);
	};

	const handleIncreaseBtn = () => {
		setQuantity((prevQuantity) =>
			prevQuantity < 8 ? prevQuantity + 1 : 8
		);
	};

	return (
		<div className="tickets-page-container">
			<div className="ticket-page-options">
				<h1 className="tickets-page-header">Choose Tickets</h1>
				<div className="tickets-options">
					<div className="ticket-info">
						<p className="ticket-desc">Ticket</p>
						<p className="ticket-price">9.50 €</p>
					</div>
					<div className="tickets-amount">
						<button
							className="quantity-btn"
							onClick={handleDecreaseBtn}
							disabled={quantity === 0}
						>
							-
						</button>
						<p className="tickets-quantity">{quantity}</p>
						<button
							className="quantity-btn"
							onClick={handleIncreaseBtn}
							disabled={quantity === 8}
						>
							+
						</button>
					</div>
				</div>
			</div>
			<div className="tickets-sum-display">
				<div className="tickets-sum-info">
					<p className="tickets-header">Tickets</p>
					<div className="tickets-info-text">
						<p className="tickets-amount">{quantity} x Ticket</p>
						<p className="tickets-price">9.50 €</p>
					</div>
				</div>
				<div className="tickets-sum-pricing">
					<p className="tickets-sum-text">Sum: </p>
					<p className="tickets-sum">
						{(quantity * 9.5).toFixed(2)} €
					</p>
				</div>
			</div>
			<TicketReservationCard
				movie={movie}
				formattedDateInfo={formattedDateInfo}
				schedule={schedule}
				quantity={quantity}
				message="Next"
				url={`/movies/${movie?.title.toLowerCase()}/${
					schedule?.id
				}/seats?quantity=${quantity}`}
			/>
		</div>
	);
};

export default TicketsPage;
