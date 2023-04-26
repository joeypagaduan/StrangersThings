import React from "react";
import { useHistory } from 'react-router-dom';

const Profile = ({user}) => {
    const history = useHistory();

    if (!user) {
        history.push('/account/login')
    }

    return (
        <>
            <h1>{user?.username} Profile</h1>
            {user.posts && user.posts.map((post, idx) => (
                <div key={post.id ?? idx}>
                    <div><strong>Location: </strong>{post.location}</div>
                    <div>{post.description}</div>
                </div>
            ))}
        </>
    )
}

export default Profile;