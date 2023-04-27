import React from "react";
import { useParams, Link } from 'react-router-dom';
import { PostDetails } from '.';

const PostPage = ({posts}) => {
    const params = useParams();
    const { postId } = params;

    const post = posts.find(post => post.id == postId);

    if (!post) {
        return (
            <div className="errorMessage">
                No Posts found with that ID
                <Link to="/posts">Back to post List</Link>
            </div>
        );
    }

    return <PostDetails post={post} />
}

export default PostPage;