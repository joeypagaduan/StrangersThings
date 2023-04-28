import React, { useState } from 'react';
import { callAPI } from '../api';

const MessageForm = ({postId, token, onSubmit}) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
   
        const response = await callAPI({
            path: `/posts/${postId}/messages`,
            method: 'post',
            body: {
                message: {
                    content,
                }
            },
            token
        });

        if (response.message) {
            await onSubmit();
            setContent('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <label htmlFor="message">Message:</label>
            <input
                name="message"
                type="text"
                onChange={event => setContent(event.target.value)}
                value={content}
            />
            <button type="submit">Send Message</button>
            <hr />
        </form>
    );
}

export default MessageForm;