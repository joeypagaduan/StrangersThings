import React from "react";
import { useHistory } from 'react-router-dom';
import { PostDetails } from '.';

const Profile = ({ user, token }) => {
    const history = useHistory();

    console.log(user);
    if (!user) {
        history.push('/account/login')
    }

    return (
        <>
            <h1>{user?.username}'s Profile</h1>


            <h2>Messages to You</h2>

            {
                user.posts && user.posts
                    .filter(post => post.messages.length > 0)
                    .map((post, idx) => (
                        <PostDetails
                            key={post._id ?? idx}
                            post={post}
                            token={token}
                        >
                            {
                                post.messages.map((message, idx) => (
                                    <p key={message.id ?? idx}>
                                        <strong>{message.fromUser.username ?? 'Unknown User'}: </strong>
                                        {message.content} 
                                    </p>
                                ))
                            }
                        </PostDetails>
                    ))
            }

            <hr />

            <h2>My Posts</h2>
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