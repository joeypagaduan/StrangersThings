import React, { useEffect, useState } from 'react';

const BASE_URL = "https://strangers-things.herokuapp.com/api";
const COHORT_NAME = '2301-ftb-pt-web-pt'

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${BASE_URL}/${COHORT_NAME}/posts`);
            const result = await response.json();
            console.log(result);
            if (result.error) throw new Error("SERVER ERROR: " + result.error.message);
            setPosts(result.data.posts);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <h1>Posts</h1>
            <div>
                {
                    posts
                        ? posts.map(
                            ({id, location, title, description, username, price, createdAt, updatedAt, willDeliver}, idx) => (
                                <div key={id ?? idx}>
                                    <h5>{title}</h5>
                                    <p>Description: {description}</p>
                                    <p>{price}</p>
                                    <p>Location: {location}</p>
                                    {willDeliver && <p>Will Deliver</p>}
                                    <p>Posted By: {username}</p>
                                    <p>Posted: {createdAt}</p>
                                    <p>Updated: {updatedAt}</p>

                                </div>
                            )
                        ) : <strong>No posts to display</strong>
                }
            </div>
        </>
    );
}

export default Posts;