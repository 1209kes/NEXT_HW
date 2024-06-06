import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Main() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(savedPosts);
    }, []);

    return (
        <div>
            <h1>Eunseong's Diary</h1>
            <Link to="/new">GO TO CREATE</Link>
            {posts.map((post, index) => (
                <div key={index}>
                    <div className="post-box">
                        <ul>
                            <h2>{post.title}</h2>
                            <h3>{post.date}</h3>
                            <p>{post.content}</p>
                            <div>
                                {post.images.map((image, imgIndex) => (
                                    <img key={imgIndex} src={image} style={{ width: '100px', height: '100px' }} />
                                ))}
                            </div>
                        </ul>
                    </div>
                    <Link to={`/detail/${index}`}>READ MORE</Link>
                </div>
            ))}
        </div>
    );
}

export default Main;
