/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ loggedIn, setIsLoggedIn }) => {
	const [showUserOptions, setShowUserOptions] = useState(false);
	const popupRef = useRef(null);
	const userIconRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleClickOutside = (e) => {
		if (
			popupRef.current &&
			!popupRef.current.contains(e.target) &&
			userIconRef.current &&
			!userIconRef.current.contains(e.target)
		)
			setShowUserOptions(false);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);

		localStorage.clear();

		navigate("/");
	}

	return (
		<nav className="nav-container">
			<Link to="/" className="logo">
				AbsoluteCinema
			</Link>
			<div className="nav-links">
				<Link to="/" className="nav-link">
					Home
				</Link>
				<Link to="/movies" className="nav-link">
					Movies
				</Link>

				{loggedIn === false ? (
					<div className="authentication">
						<Link to="/login" className="nav-link" 
							onClick={() => setShowUserOptions(false)}>
							Login
						</Link>
						<span className="word-split">/</span>
						<Link to="/register" className="nav-link">
							Register
						</Link>
					</div>
				) : (
					<div className="user-box">
						<FontAwesomeIcon
							className="nav-link"
							icon={faUser}
							onClick={() => setShowUserOptions(!showUserOptions)}
							ref={userIconRef}
						/>

						{showUserOptions && (
							<ul className="user-options" ref={popupRef}>
								<Link
									to="/profile"
									className="user-option-links"
									onClick={() =>
										setShowUserOptions(!showUserOptions)
									}
								>
									<li>Profile</li>
								</Link>

								<Link
									to="/reserved-movies"
									className="user-option-links"
									onClick={() =>
										setShowUserOptions(!showUserOptions)
									}
								>
									<li>Movie Reservations</li>
								</Link>
								<hr />
								<li
									className="user-option-links sign-out"
									onClick={handleLogout}
								>
									<span>Sign out</span>{" "}
									<FontAwesomeIcon
										className="sign-out-icon"
										icon={faRightFromBracket}
									/>
								</li>
							</ul>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
