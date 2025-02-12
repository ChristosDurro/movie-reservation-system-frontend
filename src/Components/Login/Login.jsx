import { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			username: identifier,
			password: password,
		};

		if (formData.username == null || formData.password == null) {
			alert("No empty fields allowed!");
			return;
		}

		fetch("http://localhost:8086/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				if (!response.ok) {
					alert("Wrong credentials. Please try again!");
					return Promise.reject("Wrong credentials");
				}

				return response.json();
			})
			.then((data) => {
				alert("Successful login!");

				localStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(data.user));

				setIsLoggedIn(true);

				navigate("/");
			})
			.catch((error) => {
				console.log("Error occured: " + error);
			});
	};

	return (
		<form className="login-form" onSubmit={handleLoginSubmit}>
			<div className="input-box">
				<label htmlFor="identifier">Username/Email</label>
				<input
					id="identifier"
					type="text"
					name="identifier"
					value={identifier}
					onChange={(e) => setIdentifier(e.target.value)}
				/>
			</div>

			<div className="input-box">
				<label htmlFor="password">Password</label>
				<div className="password-box">
					<input
						id="password"
						type={showPassword ? "text" : "password"}
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{showPassword ? (
						<FontAwesomeIcon
							onClick={() => setShowPassword(!showPassword)}
							className="eye-icon"
							icon={faEyeSlash}
							color="black"
						/>
					) : (
						<FontAwesomeIcon
							onClick={() => setShowPassword(!showPassword)}
							className="eye-icon"
							icon={faEye}
							color="black"
						/>
					)}
				</div>
			</div>

			<button className="submit-login" type="submit">
				Login
			</button>
		</form>
	);
};

export default Login;
