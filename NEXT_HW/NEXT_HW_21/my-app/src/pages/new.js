import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function New() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newUrls]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, content, images, date };
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        savedPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(savedPosts));
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>CREATE DIARY</h1>
            <div>
                <label>Title :</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Content :</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label>Date :</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
                <label>Add images</label>
                <input type="file" multiple onChange={handleImageChange} />
                <div>
                    {images.map((image, index) => (
                        <img key={index} src={image} style={{ width: '100px', height: '100px' }} />
                    ))}
                </div>
            </div>
            <button type="submit">CREATE!</button>
        </form>
    );
}

export default New;
