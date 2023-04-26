import React, { useState } from 'react';

import { fetchFromAPI } from '../api';

const AddPost = ({token, fetchPosts}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);

    const addPost = async (event) => {
        event.preventDefault();

        const responseData = await fetchFromAPI({
            endpoint: 'posts',
            method: "post",
            token,
            body: {
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            }
        });
        // console.log(responseData);
        const {post} = responseData;
        if (post) {
            setTitle('');
            setDescription('');
            setPrice('');
            setLocation('');
            setWillDeliver(false);
            await fetchPosts();
        }
    }

    return (
        <form onSubmit={addPost}>
            <h2>Add a New Post</h2>

            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title" 
                onChange={event => setTitle(event.target.value)}
                value={title}
            />

            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                onChange={event => setDescription(event.target.value)}
                value={description}
            />

            <label htmlFor="price">Price</label>
            <input
                type="text"
                name="price"
                onChange={event => setPrice(event.target.value)}
                value={price}
            />

            <label htmlFor="location">Location</label>
            <input
                type="text"
                name="location"
                onChange={event => setLocation(event.target.value)}
                value={location}
            />

            
            <label htmlFor="willDeliver">Delivery Available?</label>
            <input
                type="checkbox"
                checked={willDeliver}
                onChange={event => setWillDeliver(!willDeliver)}
                value={location}
            />

            <button type="submit">Submit</button>
        <hr/>
        </form>
    );
}

export default AddPost;