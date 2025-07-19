import React from 'react';

const posts = [
  {
    title: 'How I Built My Portfolio with React and Vite',
    date: 'July 2025',
    summary: 'A behind-the-scenes look at the design, tech stack, and lessons learned while building this portfolio site.',
    url: '#',
  },
  {
    title: 'My Favorite Productivity Tools for Developers',
    date: 'June 2025',
    summary: 'A roundup of apps and workflows that help me stay focused, organized, and creative as a software developer.',
    url: '#',
  },
  {
    title: 'Getting Started with Flask-SocketIO',
    date: 'May 2025',
    summary: 'A quickstart guide to building real-time web apps with Flask and Socket.IO, including code samples and tips.',
    url: '#',
  },
];

function Blog() {
  return (
    <main className="blog-container">
      <h1 className="blog-title">Blog</h1>
      <div className="blog-list">
        {posts.map((post, idx) => (
          <div className="blog-post-card" key={idx}>
            <h2 className="blog-post-title">{post.title}</h2>
            <div className="blog-post-date">{post.date}</div>
            <p className="blog-post-summary">{post.summary}</p>
            <button className="blog-readmore-btn" disabled>Read more</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Blog; 