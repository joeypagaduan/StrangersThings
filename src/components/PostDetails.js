import React from "react";
import { callAPI } from "../api";

const PostDetails = ({
    post: {_id, isAuthor, location, title, description, username, price, createdAt, updatedAt, willDeliver, active}, 
    token,
    onDelete,
    children
    }) => {

    const handleDelete = async () => {
        await callAPI({
            path: `/posts/${_id}`,
            method: 'DELETE',
            token,
        });
        onDelete && onDelete();
    }

    return (
        active ? (
            <div key={_id}>
                <h3>{title}</h3>
                <p>Description: {description}</p>
                <p>{price}</p>
                <p>Location: {location}</p>
                {willDeliver && <p>Will Deliver</p>}
                <p>Posted By: {username}</p>
                <p>Posted: {createdAt}</p>
                <p>Updated: {updatedAt}</p>
                {isAuthor && <button onClick={handleDelete}>Remove Post</button>}
                {!active && <strong>You removed this post!</strong>}
                {children}
                <hr />
            </div>
        ) : ''
    );
}

export default PostDetails;