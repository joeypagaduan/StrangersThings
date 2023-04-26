import React from 'react';
import { AddPost } from '.';

const Posts = ({posts, fetchPosts, token}) => (
    <>
        <h1>Posts</h1>
        {token && <AddPost token={token} fetchPosts={fetchPosts}/>}
        <div>
            {posts.map(
                        ({id, isAuthor, location, title, description, username, price, createdAt, updatedAt, willDeliver}, idx) => (
                            <div key={id ?? idx}>
                                <h5>{title}</h5>
                                <p>Description: {description}</p>
                                <p>{price}</p>
                                <p>Location: {location}</p>
                                {willDeliver && <p>Will Deliver</p>}
                                {isAuthor && <small>Posted By Me</small>}
                                <p>Posted By: {username}</p>
                                <p>Posted: {createdAt}</p>
                                <p>Updated: {updatedAt}</p>
                                <hr />
                            </div>
                        )
            )}
        </div>
    </>
);

export default Posts;