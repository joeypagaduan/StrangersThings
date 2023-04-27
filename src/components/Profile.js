import React from "react";
import { useHistory } from 'react-router-dom';
import { PostDetails } from '.';

const Profile = ({user, token}) => {
    const history = useHistory();

    console.log(user);
    if (!user) {
        history.push('/account/login')
    }

    return (
        <>
            <h1>{user?.username}'s Profile</h1>
            {user.posts && user.posts.map((post, idx) => (
                <PostDetails
                    key={post._id ?? idx}
                    post={post}
                    token={token}
                />
            ))}
        </>
    )
}

export default Profile;