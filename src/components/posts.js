import React from 'react';
import { Link } from "react-router-dom";
import { AddPost, PostDetails } from '.';

const Posts = ({posts, fetchPosts, token}) => {
    const onDelete = async () => {
        await fetchPosts();
    }

    return (
        <>
            <h1>Posts</h1>
            {token && <AddPost token={token} fetchPosts={fetchPosts} /> }
            <div>
                {posts.map(
                    (post, idx) => (
                        <PostDetails
                            key={post._id ?? idx}
                            onDelete={onDelete}
                            token={token}
                            post={post}>
                            <Link to={`/posts/${post._id}`}>
                                See More
                            </Link>
                            <hr />
                        </PostDetails>
                    )
                )}
            </div>
        </>
    );
}

export default Posts;