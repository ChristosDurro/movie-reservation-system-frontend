
import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
  return (
	<div className="home-container">
		<h1 className="home-header">Welcome to AbsoluteCinema!</h1>
		<div className="home-description">
			<p>Here you can see all the top movies.</p>
			<p>Click the button below to see what's playing now.</p>
		</div>
		<Link to="/movies" className="home-button">Movies</Link>
	</div>
  )
}

export default Home