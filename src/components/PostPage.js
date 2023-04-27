import React from "react";
import { useParams, useHistory, Link } from 'react-router-dom';
import { PostDetails } from '.';

const PostPage = ({posts, fetchPosts, token}) => {
    const params = useParams();
    const { post_Id } = params;

    const history = useHistory();

    const post = posts.find(post => post._id == post_Id);

    const onDelete = async () => {
        await fetchPosts();
        history.push('/posts');
    }

    if (!post) {
        return (
            <div className="errorMessage">
                No Posts found with that ID
                <Link to="/posts">Back to post List</Link>
            </div>
        );
    }

    return <PostDetails onDelete={onDelete} post={post} token={token} />
}

export default PostPage;