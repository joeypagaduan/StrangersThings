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


            <h2>Messages About Your Posts</h2>

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
                                post.messages.map((comment, idx) => (
                                    <p key={comment.id ?? idx}>
                                        <strong>{comment.user?.username ?? 'Unknown User'}: </strong>
                                        {comment.content} 
                                        <small>{' '}
                                            (<time dateTime={comment.createdAt}>
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </time>)
                                        </small>
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