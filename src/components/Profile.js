import React from "react";
import { useHistory } from 'react-router-dom';
import { PostDetails } from '.';

const Profile = ({ user, token }) => {
    const history = useHistory();

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
            <h2>Messages You've Sent</h2>
            {
                user.messages && user.messages
                    .filter(message => message.fromUser._id === user._id)
                    .map((message, idx) => (
                        <div key={message._id ?? idx} id="myMessages">
                            <span>You said: </span>
                            <strong> {message.content} </strong>
                            <span> about </span>
                            <strong> {message.post.title}</strong> 
                        </div>
                    ))
            }

            <hr />

            <h2>My Posts</h2>
            <div className="postDiv">
                {user.posts && user.posts.map((post, idx) => (
                    <PostDetails
                        key={post._id ?? idx}
                        post={post}
                        token={token}
                    />
                ))}
            </div>
        </>
    )
}

export default Profile;