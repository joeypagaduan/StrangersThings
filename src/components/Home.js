import React from "react";
import { Link } from 'react-router-dom';

const Home = ({user}) => (
    <>
        <h1>Stranger's Things</h1>
        {user?.data &&  <>
            <p>Welcome {user}!</p>
            <Link to="/profile">View Profile</Link>
        </>}
    </>
)
export default Home;