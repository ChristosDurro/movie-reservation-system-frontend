/* eslint-disable react/prop-types */
import "./Profile.css";

const Profile = ({user}) => {
	return <div className="profile-container">
		<h1 className="profile-header">Profile</h1>
		<div className="profile-info">
			<p className="info">First Name: {user.firstName}</p>
			<p className="info">Last Name: {user.lastName}</p>
			<p className="info">Username: {user.username}</p>
			<p className="info">Email: {user.email}</p>
		</div>
	</div>;
};

export default Profile;
