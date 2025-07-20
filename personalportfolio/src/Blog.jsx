import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import './App.css';

const posts = [
  {
    title: 'How I Built My Portfolio with React and Vite',
    date: 'July 2025',
    author: 'Akalewold Magera',
    summary: 'A behind-the-scenes look at the design, tech stack, and lessons learned while building this portfolio site.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    tags: ['React', 'Vite', 'Portfolio']
  },
  {
    title: 'My Favorite Productivity Tools for Developers',
    date: 'June 2025',
    author: 'Akalewold Magera',
    summary: 'A roundup of apps and workflows that help me stay focused, organized, and creative as a software developer.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    tags: ['Productivity', 'Tools']
  },
  {
    title: 'Getting Started with Flask-SocketIO',
    date: 'May 2025',
    author: 'Akalewold Magera',
    summary: 'A quickstart guide to building real-time web apps with Flask and Socket.IO, including code samples and tips.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    tags: ['Flask', 'SocketIO', 'Python']
  },
];

function Blog() {
  const [showContact, setShowContact] = useState(false);
  return (
    <>
      <nav className="portfolio-navbar">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/blog" className="navbar-link">Blog</Link>
        <a href="/resume.pdf" className="navbar-link navbar-resume-btn" download>Download Resume</a>
        <button className="navbar-link navbar-contact-btn" onClick={() => setShowContact(true)} type="button">Contact</button>
      </nav>
      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content contact-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Contact</h2>
            <p>Email: <a href="mailto:akaalewoldmagera@gmail.com">akaalewoldmagera@gmail.com</a></p>
            <div className="contact-icons">
              <a href="https://www.linkedin.com/in/akalewold-magera-51200228b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://github.com/AKXtreme" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://www.facebook.com/share/16ri9J9Q6D/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.instagram.com/akalewoldak?igsh=Mm9haXk2azRxOW04" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://x.com/akalewoldx?t=_lL70lqxjBCDsZoy8gtyFw&s=09" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>
            </div>
            <button className="contact-modal-close" onClick={() => setShowContact(false)}>Close</button>
          </div>
        </div>
      )}
      <main className="blog-container">
        <h1 className="blog-title">Blog</h1>
        <div className="blog-list">
          {posts.map((post, idx) => (
            <div className="blog-post-card" key={idx}>
              <img src={post.image} alt={post.title} className="blog-post-image" />
              <div className="blog-post-meta">
                <span className="blog-post-date">{post.date}</span>
                <span className="blog-post-author">by {post.author}</span>
                <span className="blog-post-tags">
                  {post.tags.map(tag => (
                    <span className="blog-post-tag" key={tag}>{tag}</span>
                  ))}
                </span>
              </div>
              <h2 className="blog-post-title">{post.title}</h2>
              <p className="blog-post-summary">{post.summary}</p>
              <button className="blog-readmore-btn">Read more</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Blog; 