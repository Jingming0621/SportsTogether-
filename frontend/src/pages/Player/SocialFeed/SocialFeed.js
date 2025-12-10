import React, { useState } from 'react';
import { socialPosts, currentUser } from '../../../data/mockData';
import './SocialFeed.css';

const SocialFeed = () => {
    const [posts, setPosts] = useState(socialPosts);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPostImage(URL.createObjectURL(file));
        }
    };

    const handleCreatePost = () => {
        if (!newPostContent.trim()) {
            alert('Please enter some content for your post');
            return;
        }

        alert('🎉 Post Created!\n\nYour post is now visible to your network.\n\n(This is a prototype UI)');
        setNewPostContent('');
        setNewPostImage(null);
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, likedByUser: !post.likedByUser, likes: post.likedByUser ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    return (
        <div className="social-feed-page">
            <div className="social-feed-container">
                <h1>Community Feed</h1>
                <p className="subtitle">Stay connected with your sports community</p>

                {/* Create Post */}
                <div className="create-post-card">
                    <div className="create-post-header">
                        <img src={currentUser.profilePicture} alt={currentUser.username} className="user-avatar" />
                        <textarea
                            placeholder="Share your sports activity or achievements..."
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            rows="3"
                        />
                    </div>

                    {newPostImage && (
                        <div className="image-preview">
                            <img src={newPostImage} alt="Preview" />
                            <button className="remove-image" onClick={() => setNewPostImage(null)}>✕</button>
                        </div>
                    )}

                    <div className="create-post-actions">
                        <input
                            type="file"
                            id="post-image"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="post-image" className="upload-btn">
                            📷 Add Photo
                        </label>
                        <button className="post-btn" onClick={handleCreatePost}>
                            Post
                        </button>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="posts-feed">
                    {posts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="post-header">
                                <img src={post.user.profilePicture} alt={post.user.username} className="post-avatar" />
                                <div className="post-user-info">
                                    <div className="post-username">{post.user.username}</div>
                                    <div className="post-timestamp">{post.timestamp}</div>
                                </div>
                            </div>

                            <div className="post-content">
                                <p>{post.content}</p>
                                {post.image && (
                                    <img src={post.image} alt="Post content" className="post-image" />
                                )}
                            </div>

                            <div className="post-stats">
                                <span>{post.likes} likes</span>
                                <span>{post.comments} comments</span>
                            </div>

                            <div className="post-actions">
                                <button
                                    className={`action-btn ${post.likedByUser ? 'liked' : ''}`}
                                    onClick={() => handleLike(post.id)}
                                >
                                    {post.likedByUser ? '❤️' : '🤍'} Like
                                </button>
                                <button className="action-btn" onClick={() => alert('Comment feature - Prototype UI')}>
                                    💬 Comment
                                </button>
                                <button className="action-btn" onClick={() => alert('Share feature - Prototype UI')}>
                                    📤 Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialFeed;

