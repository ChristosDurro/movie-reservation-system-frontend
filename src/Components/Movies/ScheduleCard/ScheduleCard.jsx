/* eslint-disable react/prop-types */
import "./ScheduleCard.css";

const ScheduleCard = ({ schedule }) => {
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
	const formattedTime = `${hour}:${minutes < 10 ? "0" + minutes : minutes}`;

	return (
		<div className="schedule-card">
			<p className="showtime-day-name">{dayString}</p>
			<p className="showtime-day">
				{day} {monthString.substring(0, 3)}.
			</p>
			<p className="showtime-hour">{formattedTime}</p>
		</div>
	);
};

export default ScheduleCard;
