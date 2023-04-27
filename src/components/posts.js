import React from 'react';
import { Link } from "react-router-dom";
import { AddPost, PostDetails } from '.';

const Posts = ({posts, fetchPosts, token}) => (
    <>
        <h1>Posts</h1>
        {token && <AddPost token={token} fetchPosts={fetchPosts}/>}
        <div>
            {posts.map(
                (post, idx) => (
                    <PostDetails
                        key={post.id ?? idx}
                        post={post}>
                        <Link to={`/posts/$post.id}`}>
                            Details
                        </Link>
                        <hr />
                    </PostDetails>
                )
            )}
        </div>
    </>
);

export default Posts;