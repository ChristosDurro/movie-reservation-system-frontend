/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./Profile.css";

const Profile = ({ user }) => {
	useEffect(() => {
		const checkToken = () => {
			const token = localStorage.getItem("token");

			if (token == null) {
				alert("Unathorized access. Please login before procceeding!");
				window.location.href = "/login";
				return;
			}

			fetch("http://localhost:8086/users/validateToken", {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
				.then((res) => {
					if (res.status == 401) {
						localStorage.removeItem("user");
						localStorage.removeItem("token");

						alert("Token expired. Please login again!");
						window.location.href = "/login";
						return Promise.reject("Token Expired.");
					}
					return res.json();
				})
				.then((data) => console.log(data))
				.catch((error) => console.log(error));
		};

		checkToken();
	});

	return (
		<div className="profile-container">
			<h1 className="profile-header">Profile</h1>
			<div className="profile-info">
				<p className="info">First Name: {user.firstName}</p>
				<p className="info">Last Name: {user.lastName}</p>
				<p className="info">Username: {user.username}</p>
				<p className="info">Email: {user.email}</p>
			</div>
		</div>
	);
};

export default Profile;
