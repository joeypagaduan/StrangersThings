import React, { useState } from 'react';
import { useHistory, useLocation, Link } from "react-router-dom";
import { AddPost, PostDetails } from '.';

const Posts = ({posts, fetchPosts, token}) => {
    // const [searchValue, setSearchValue] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const history = useHistory();
    const {search} = useLocation();

    const query = new URLSearchParams(search);
    const searchValue = query.get('searchValue') || '';

    const onDelete = async () => {
        await fetchPosts();
    }

    const handleSearch = (event) => {
        const substring = event.target.value;

        if (substring.trim() !== '') {
            const filteredPosts = posts
                .filter(post =>
                    post.title.toLowerCase().includes(substring.toLowerCase().trim()) ||
                    post.description.toLowerCase().includes(substring.toLowerCase().trim())
                );
            
            const search = new URLSearchParams({searchValue: substring.trim()});
            history.push('/posts?' + search.toString());
            setFilteredPosts(filteredPosts);
        }
    }

    return (
        <>
            <h1>Posts</h1>
            {token && <AddPost token={token} fetchPosts={fetchPosts} /> }

            <input 
                name="search"
                type="text" 
                onChange={handleSearch} 
                value={searchValue}
            />

            <div>
                {filteredPosts.length ?
                    filteredPosts.map(
                        (post, idx) => (
                            <PostDetails
                                key={post._id ?? idx}
                                onDelete={onDelete}
                                token={token}
                                post={post}>
                                <Link to={`/posts/${post._id}`}>
                                    Details
                                </Link>
                            </PostDetails>
                        )
                    ) : <div>No Matching Posts!</div>}
            </div>
        </>
    );
}

export default Posts;