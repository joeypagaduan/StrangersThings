import React from 'react';

const Message = ({message}) => (
    <div>
        <small>
            {'From You '}at{' '}
            <time dateTime={message.createdAt}>
                {new Date(message.createdAt).toLocaleString()}
            </time>
        </small>
        <br />
        <strong>{message.content}</strong>
        <hr />
    </div>
);

export default Message;