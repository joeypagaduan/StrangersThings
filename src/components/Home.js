import React from "react";
import { Link } from 'react-router-dom';

const Home = ({ user}) => (
    <>
        <h1>Stranger's Things</h1>
        <div id="welcomeUser">
            <img src="../public/images/800_800logo2.png" alt="Stranger's Things Logo" id='logo'/>
            {user?.username &&  <>
                <p>Welcome {user.username}!</p>
                <Link to="/profile">View Your Profile</Link>
            </>}
        </div>
    </>
)
export default Home;