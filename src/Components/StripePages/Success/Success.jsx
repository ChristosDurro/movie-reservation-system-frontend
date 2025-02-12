/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Success.css";

const Success = () => {

	return (
		<div className="success-container">
				<h1 className="success-header">Reservation successful!</h1>
				<Link to="/">Return to home</Link>
		</div>
	);
};

export default Success;
