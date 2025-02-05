import { Link } from "react-router-dom";
import "./Cancel.css";

const Cancel = () => {
	return (
		<div className="cancel-container">
			<h1 className="cancel-header">Payment Canceled</h1>
			<Link to="/" className="cancel-link">
				Return home
			</Link>
		</div>
	);
};

export default Cancel;
