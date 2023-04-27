import React from "react";

const PostDetails = ({
    post: {id, isAuthor, location, title, description, username, price, createdAt, updatedAt, willDeliver}, children
    }) => (
        <div key={id}>
            <h5>{title}</h5>
            <p>Description: {description}</p>
            <p>{price}</p>
            <p>Location: {location}</p>
            {willDeliver && <p>Will Deliver</p>}
            {isAuthor && <small>Posted By Me</small>}
            <p>Posted By: {username}</p>
            <p>Posted: {createdAt}</p>
            <p>Updated: {updatedAt}</p>
            {children}
        </div>
);

export default PostDetails;