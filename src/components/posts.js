import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../api';
import { AddPost } from '.';

const BASE_URL = "https://strangers-things.herokuapp.com/api";
const COHORT_NAME = '2301-ftb-pt-web-pt'

const Posts = ({token}) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const data = await fetchFromAPI({
            endpoint: "posts", token
        })

        if (data?.posts) {
            setPosts(data.posts);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [token]);

    return (
        <>
            <h1>Posts</h1>
            {token && <AddPost token={token} fetchPosts={fetchPosts}/>}
            <div>
                {
                    posts
                        ? posts.map(
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

                                </div>
                            )
                        ) : <strong>No posts to display</strong>
                }
            </div>
        </>
    );
}

export default Posts;