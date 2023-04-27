import React from "react";
import { fetchFromAPI } from "../api";

const PostDetails = ({
    post: {_id, isAuthor, location, title, description, username, price, createdAt, updatedAt, willDeliver}, 
    token,
    onDelete,
    children
    }) => {

    const handleDelete = async () => {
        await fetchFromAPI({
            endpoint: 'posts',
            postId: _id,
            method: 'DELETE',
            token,
        });
        onDelete && onDelete();
    }

    return (
        <div key={_id}>
            <h5>{title}</h5>
            <p>Description: {description}</p>
            <p>{price}</p>
            <p>Location: {location}</p>
            {willDeliver && <p>Will Deliver</p>}
            <p>Posted By: {username}</p>
            <p>Posted: {createdAt}</p>
            <p>Updated: {updatedAt}</p>
            {isAuthor && <button onClick={handleDelete}>Remove Post</button>}
            {children}
        </div>
    );  
}

export default PostDetails;