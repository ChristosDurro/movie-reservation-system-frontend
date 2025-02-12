import { useEffect, useState } from "react";
import "./Seats.css";
import { useParams } from "react-router-dom";
import Seat from "./Seat/Seat";
import TicketReservationCard from "../TicketsPage/TicketReservationCard/TicketReservationCard";

const Seats = () => {
	const { scheduleId } = useParams();
	const queryParams = new URLSearchParams(window.location.search);
	const quantity = queryParams.get("quantity");
	const [seats, setSeats] = useState(null);
	const [seatsSelected, setSeatsSelected] = useState([]);
	const [movie, setMovie] = useState(null);
	const [schedule, setSchedule] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [user, setUser] = useState(null);

	const [formattedDateInfo, setFormattedDateInfo] = useState({
		hour: "",
		day: "",
		dayString: "",
		monthString: "",
		formattedTime: "",
	});

	// fetch seats and schedule from scheduleId
	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token == null) {
			alert("Unathorized access. Please login before procceeding!");
			window.location.href = "/login";
			return;
		}

		const fetchSeats = (scheduleId) => {
			fetch(`http://localhost:8086/seats/schedule/${scheduleId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					if (res.status == 401) {
						localStorage.clear();
						alert("Token expired. Please login again!");
						window.location.href = "/login";
						return Promise.reject("Expired Token");
					}

					return res.json();
				})
				.then((data) => setSeats(data))
				.catch((error) => {
					setErrorMessage("Something went wrong. Please try again!");
					console.log(error);
				});
		};

		const fetchSchedule = (scheduleId) => {
			fetch(`http://localhost:8086/schedules/${scheduleId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
				
					if (res.status == 401) {
						localStorage.clear();
						alert("Token expired. Please login again!");
						window.location.href = "/login";
						return Promise.reject("Expired Token");
					}

					return res.json()
				})
				.then((data) => setSchedule(data))
				.catch((error) => console.log(error));
		};

		fetchSeats(scheduleId);
		fetchSchedule(scheduleId);
		setUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	// fetch movie from scheduleId
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

	return (
		<div className="seats-container">
			<h1 className="seats-header">Choose your seats</h1>
			<div>
				{errorMessage !== null ? (
					<p className="error-message">{errorMessage}</p>
				) : seats ? (
					<div className="seats-section">
						<div className="seats-box">
							<div className="screen-display">
								<p className="screen-text">Screen</p>
							</div>
							<div className="seats-display">
								{seats.map((seat) => {
									return (
										<Seat
											key={seat.id}
											seatRow={seat.seatRow}
											seatColumn={seat.seatColumn}
											seatColor={
												seatsSelected.some(
													(seatSelected) =>
														seatSelected &&
														seatSelected.id ===
															seat.id
												)
													? "#4ddb4d"
													: seat.available
													? "#e6e6e6"
													: "#857e7e"
											}
											seatId={seat.id}
											setSeatsSelected={setSeatsSelected}
											quantity={quantity}
											scheduleId={scheduleId}
										/>
									);
								})}
							</div>
						</div>
						<div className="seats-guide">
							<div className="seats-explanation">
								<Seat seatColor="#e6e6e6" dummyValue={true} />
								<p className="seats-explanation-text">
									Available
								</p>
							</div>
							<div className="seats-explanation">
								<Seat seatColor="#857e7e" dummyValue={true} />
								<p className="seats-explanation-text">
									Reserved
								</p>
							</div>
							<div className="seats-explanation">
								<Seat seatColor="#4ddb4d" dummyValue={true} />
								<p className="seats-explanation-text">
									Your Seats
								</p>
							</div>
						</div>
						<TicketReservationCard
							movie={movie}
							formattedDateInfo={formattedDateInfo}
							schedule={schedule}
							quantity={quantity}
							message="Checkout"
							url={`/movies/${movie?.title.toLowerCase()}/${
								schedule?.id
							}/checkout?quantity=${quantity}`}
							seatsSelected={seatsSelected}
							seatsSelectedLen={seatsSelected.length}
							user={user}
						/>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default Seats;
