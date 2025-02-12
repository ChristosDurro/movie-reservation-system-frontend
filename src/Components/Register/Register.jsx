import { useState } from "react"
import "./Register.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Register = () => {

	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [uname, setUname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			firstName: fname,
			lastName: lname,
			username: uname,
			email: email,
			password: password
		};

		if (formData.email == null || formData.firstName == null || formData.lastName == null || formData.password == null || formData.username == null) {
			alert("No empty fields allowed!")
			return;
		}

		try {
			const response = await fetch("http://localhost:8086/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				alert("User Successfully created");
				navigate("/");
			} else {
				alert("Error during registration: ", response.statusText);
			}
		} catch (e) {
			alert("Error: ", e);
		}
	}

  return (
	<form className="register-form" onSubmit={handleSubmit}>
		<div className="name-box">
			<div className="input-box">
				<label htmlFor="fName">First Name</label>
				<input required id="fName" type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
			</div>
			<div className="input-box">
				<label htmlFor="lName">Last Name</label>
				<input required id="lName" type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
			</div>
		</div>

		<div className="input-box">
			<label htmlFor="uName">Username</label>
			<input required id="uName" type="text" value={uname} onChange={(e) => setUname(e.target.value)} />
		</div>
		
		<div className="input-box">
			<label htmlFor="email">Email</label>
			<input required id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
		</div>

		<div className="input-box">
			<label htmlFor="password">Password</label>
			<div className="password-box">
				<input required id="password" type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

				{
					showPassword ? 
					<FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" icon={faEyeSlash} color="black" /> :
					<FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} className="eye-icon" icon={faEye} color="black" />
				}
				
			</div>
		</div>
		<button className="submit-register" type="submit">Register</button>
	</form>
  )
}

export default Register