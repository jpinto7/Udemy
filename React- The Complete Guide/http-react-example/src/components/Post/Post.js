import React from 'react';

import './Post.css';

const post = ({ author, clicked, title }) => (
    <article className="Post" onClick={clicked}>
        <h1>{title}</h1>
        <div className="Info">
            <div className="Author">{author}</div>
        </div>
    </article>
);

export default post;
