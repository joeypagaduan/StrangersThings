import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
import { fetchFromAPI } from "../api";

const AccountForm = ({setToken, setUser}) => {
    const params = useParams();
    const history = useHistory();
    
    const {actionType} = params;
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            user: {
                username,
                password
            }
        }
        const data = await fetchFromAPI({
            endpoint: actionType,
            method: "post",
            body: requestBody,
        })
        const {token} = data;
        if (token) {
            const data = await fetchFromAPI({
                endpoint: 'user',
                token,
            })
            const username = data?.username;
            if (username) {
                setUsername('');
                setPassword('');
                setToken(token);
                setUser(data);
                history.push('/');
            }
        }
    }

    return (
        <>
            <h1>{actionType === "register" ? "Sign Up" : "Log In"}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">{actionType === "register" ? "Register" : "Log In"}</button>
                {actionType === "register"
                    ? <Link to="/account/login">Already have an account? Log in here.</Link>
                    : <Link to="/account/register">Need an account? Register here.</Link>}
            </form>
        </>
    );
}

export default AccountForm;