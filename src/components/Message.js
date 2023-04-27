import React from 'react';

const Message = ({message}) => (
    <div>
        <small>
            {message?.user?.username ?? 'Unknown user'}
            {' '}at{' '}
            <time datetime={message.createdAt}>
                {new Date(message.createdAt).toLocaleString()}
            </time>
        </small>
        <br />
        {message.content}
        <hr />
    </div>
);

export default Message;