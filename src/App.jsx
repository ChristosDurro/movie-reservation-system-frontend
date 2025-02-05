import "./App.css";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import MovieReservations from "./Components/MovieReservations/MovieReservations";
import MoviePage from "./Components/Movies/MoviePage/MoviePage";
import TicketsPage from "./Components/TicketsPage/TicketsPage";
import Seats from "./Components/Seats/Seats";
import Success from "./Components/StripePages/Success/Success";
import Cancel from "./Components/StripePages/Cancel/Cancel";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
	// Initialize the state based on localStorage
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		return localStorage.getItem("user") !== null;
	});

	// Sync user state with localStorage when the user logs in
	useEffect(() => {
		if (isLoggedIn) {
			const storedUser = localStorage.getItem("user");
			setUser(storedUser ? JSON.parse(storedUser) : null);
		} else {
			setUser(null);
		}
	}, [isLoggedIn]);

	return (
		<>
			<BrowserRouter>
				<Navbar loggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
				<Routes>
					<Route path="/" element={<Home user={user} />} />
					<Route path="/movies" element={<Movies user={user} />} />
					<Route path="/movies/:id/:title" element={<MoviePage loggedIn={isLoggedIn} />} />
					<Route path="/movies/:title/:scheduleId/tickets" element={<TicketsPage />} />
					<Route path="/movies/:title/:scheduleId/seats" element={<Seats />} />
					<Route
						path="/login"
						element={<Login setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile user={user} />} />
					<Route path="/reserved-movies" element={<MovieReservations user={user} />} />
					<Route path="/success" element={<Success user={user} />} />
					<Route path="/cancel" element={<Cancel />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
