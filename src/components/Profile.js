import React from "react";
import { useHistory } from 'react-router-dom';
import { PostDetails } from '.';

const Profile = ({user}) => {
    const history = useHistory();

    if (!user) {
        history.push('/account/login')
    }

    return (
        <>
            <h1>{user?.username} Profile</h1>
            {user.posts && user.posts.map((post, idx) => (
                <PostDetails
                    key={post.id ?? idx}
                    post={post}
                />
            ))}
        </>
    )
}

export default Profile;