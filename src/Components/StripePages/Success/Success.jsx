/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import "./Success.css";
import { useEffect, useState } from "react";

const Success = ({ user }) => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);

	const scheduleId = params.get("scheduleId");
	const seatsSelected = JSON.parse(params.get("seatsSelected"));

	const [schedule, setSchedule] = useState(null);
	const [didRun, setDidRun] = useState(false);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const fetchSchedule = (scheduleId) => {
			fetch(`http://localhost:8082/schedules/${scheduleId}`)
				.then((res) => res.json())
				.then((data) => setSchedule(data))
				.catch((error) => {
					console.log(error);
					alert(
						"Something went wrong with schedule fetching. Please try again!"
					);
				});
		};
		console.log("1st use effect called!");

		fetchSchedule(scheduleId);
	}, []);

	useEffect(() => {
		const createTickets = (schedule, user) => {
			setDidRun(true);

			const tickets = seatsSelected.map((seatId) => ({
				userId: user.id,
				movieId: schedule.movieId,
				scheduleId: schedule.id,
				seatId: seatId,
			}));

			const seatIdsToUpdate = tickets.map((ticket) => ticket.seatId);

			const request = {
				user: user,
				ticketsList: tickets,
				seats: {
					seatIdsToUpdate: seatIdsToUpdate,
					availability: false,
				},
			};

			console.log(tickets, seatIdsToUpdate);

			fetch("http://localhost:8085/reservation", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			})
				.then((res) => {
					if (!res.ok) {
						console.log(res);

						setMessage("Reservation Failed. Please try again!");
						return;
					}

					return res.json();
				})
				.then((data) => {
					console.log(data);
					setMessage(data.message);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		console.log("2nd use effect called!");
		if (schedule !== null && !didRun) createTickets(schedule, user);
	}, [schedule]);

	return (
		<div className="success-container">
			{message !== null ? (
				<>
					<h1 className="success-header">{message}</h1>
					<Link to="/">Return to home</Link>
				</>
			) : (
				<p className="loading">Loading...</p>
			)}
		</div>
	);
};

export default Success;
