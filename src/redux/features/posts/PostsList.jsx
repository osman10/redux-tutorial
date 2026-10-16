// src/features/posts/PostsList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p style={{ textAlign: 'center' }}>Loading posts...</p>;
  }

  if (status === 'failed') {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Posts from JSONPlaceholder</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {posts.slice(0, 10).map((post) => (
          <li 
            key={post.id} 
            style={{ 
              background: '#f9f9f9', 
              margin: '10px 0', 
              padding: '15px', 
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{post.title}</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;