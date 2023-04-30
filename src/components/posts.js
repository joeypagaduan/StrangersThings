import React, { useState } from 'react';
import { useHistory, useLocation, Link } from "react-router-dom";
import { AddPost, PostDetails } from '.';

const Posts = ({posts, fetchPosts, token}) => {

    const {search} = useLocation();
    const query = new URLSearchParams(search);

    const [searchValue, setSearchValue] = useState(query.get('searchValue') || '');

    const history = useHistory();

    const filteredPosts = filterPosts(posts, searchValue);

    const onDelete = async () => {
        await fetchPosts();
    }

    const handleSearch = (event) => {
        const substring = event.target.value;

            const search = new URLSearchParams({searchValue: substring.trim()});
            history.push('/posts?' + search.toString());
            setSearchValue(substring);
        // }
    }
    
    return (
        <>
            {token && <AddPost token={token} fetchPosts={fetchPosts} /> }
            <div id="searchDiv">
                <h2>Search Posts</h2>
                <input id="searchBox"
                    name="search"
                    type="text" 
                    onChange={handleSearch} 
                    value={searchValue}
                />
            </div>    

            <div className="postDiv">
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

function filterPosts (posts, substring) {
    return posts.filter(post =>
        post.title.toLowerCase().includes(substring.toLowerCase().trim()) ||
        post.description.toLowerCase().includes(substring.toLowerCase().trim())
        )}



export default Posts;