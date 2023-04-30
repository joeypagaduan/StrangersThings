import React from "react";
import { useParams, useHistory, Link } from 'react-router-dom';
import { PostDetails, Message, MessageForm } from '.';

const PostPage = ({posts, fetchPosts, token}) => {
    const params = useParams();
    const { post_Id } = params;

    const history = useHistory();

    const post = posts.find(post => post._id == post_Id);

    if (!post) {
        return (
            <div className="errorMessage">
                No Post found with that ID
                <Link to="/posts">Back to Posts</Link>
            </div>
        );
    }

    const {messages} = post;

    const onDelete = async () => {
        await fetchPosts();
        history.push('/posts');
    }

    const messageCreated = async () => {
        await fetchPosts();
    }

    return (
        <div id="singlePostView">
            <PostDetails onDelete={onDelete} post={post} token={token}>
            {messages.length ? <h2>Messages</h2> : null}

            { token
                ? !post.isAuthor && <MessageForm
                    postId={post._id}
                    token={token}
                    onSubmit={messageCreated}
                    />
                : <Link to="/account/login">Want to send a Message? Log in here.</Link>
            }
                {messages.length ? messages.map(
                    (message, idx) => (
                        <Message key={message.id ?? idx} message={message} />
                    )
                ): null}
            </PostDetails>
        </div>
    )
}

export default PostPage;