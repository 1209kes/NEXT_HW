import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const imgRefs = useRef([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const selectedPosts = savedPosts[id];
        setPost(selectedPosts);
    }, [id]);

    const changeImageHref = (index) => {
        const img = imgRefs.current[index];
        if (img) {
            const Large = img.style.width === '100px';
            img.style.width = Large ? '300px' : '100px';
            img.style.height = Large ? '300px' : '100px';
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div>
                {post.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        ref={(el) => (imgRefs.current[index] = el)}
                        onClick={() => changeImageHref(index)}
                        style={{ width: '200px', height: '200px', cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Detail;
