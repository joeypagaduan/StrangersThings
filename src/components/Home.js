import React from "react";
import { Link } from 'react-router-dom';

const Home = ({user}) => (
    <>
        <h1>Stranger's Things</h1>
        {user?.username &&  <>
            <p>Welcome {username.username}!</p>
            <Link to="/profile">View Profile</Link>
        </>}
    </>
)
export default Home;