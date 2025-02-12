/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Seat.css";

const Seat = ({
	seatRow,
	seatColumn,
	seatColor,
	dummyValue,
	setSeatsSelected,
	seatId,
	quantity,
	scheduleId,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);

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

	const handleSeatSelection = (id) => {
		const token = localStorage.getItem("token");

		if (token == null) {
			alert("Unathorized access. Please login before procceeding!");
			window.location.href = "/login";
			return;
		}

		fetch(`http://localhost:8086/seats/schedule/${scheduleId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.status == 401) {
					localStorage.removeItem("user");
					localStorage.removeItem("token");

					alert("Token expired. Please login again!");
					window.location.href = "/login";
					return Promise.reject("Token Expired!");
				}

				return res.json();
			})
			.then((data) => {
				// Find the seat the user clicked on
				const clickedSeat = data.find((seat) => seat.id === id);

				if (!clickedSeat || !clickedSeat.available) {
					alert("Seat is already reserved!");
					return;
				}

				// Store the selected seats, starting with the clicked one
				const seatsSelected = [clickedSeat];

				console.log(
					"clickedSeat: " +
						alphabet[clickedSeat.seatRow] +
						clickedSeat.seatColumn
				);

				let seatsNeeded = quantity - 1;

				// Check to the right of the clicked seat
				for (
					let offset = 1;
					offset <= quantity && seatsNeeded > 0;
					offset++
				) {
					// Check the right seat
					if (clickedSeat.seatColumn + offset <= 9) {
						// Adjusted boundary check
						const rightSeat = data.find(
							(seat) =>
								seat.seatRow === clickedSeat.seatRow &&
								seat.seatColumn ===
									clickedSeat.seatColumn + offset &&
								seat.available
						);

						if (rightSeat) {
							seatsSelected.push(rightSeat);
							seatsNeeded--;
						}
					}

					// Check the left seat
					if (
						clickedSeat.seatColumn - offset >= 0 &&
						seatsNeeded > 0
					) {
						// Adjusted boundary check
						const leftSeat = data.find(
							(seat) =>
								seat.seatRow === clickedSeat.seatRow &&
								seat.seatColumn ===
									clickedSeat.seatColumn - offset &&
								seat.available
						);

						if (leftSeat) {
							seatsSelected.push(leftSeat);
							seatsNeeded--;
						}
					}
				}
				// If we successfully selected three seats, update state
				if (seatsNeeded === 0) {
					// console.log("seats selected: " + JSON.stringify(seatsSelected));

					setSeatsSelected(seatsSelected);
				} else {
					alert("Not enough adjacent seats available!");
				}
			})
			.catch((error) => {
				console.log(error);
				alert("Something went wrong. Please try again!");
			});
	};

	return (
		<div
			className={`seat-container ${
				seatColor === "#4ddb4d"
					? "my-seat"
					: seatColor === "#e6e6e6"
					? "available-seat"
					: "taken-seat"
			} ${dummyValue ? "seat-no-hover" : ""}`}
			onClick={() => handleSeatSelection(seatId, scheduleId)}
		>
			<div
				className={`seat  ${
					seatColor === "#4ddb4d"
						? "my-seat"
						: seatColor === "#e6e6e6"
						? "available-seat"
						: "taken-seat"
				} ${dummyValue ? "seat-no-hover" : ""}`}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				{showTooltip && !dummyValue && (
					<div className="seat-tooltip">
						<p className="tooltip-text">
							{alphabet[seatRow]}-{seatColumn}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Seat;
