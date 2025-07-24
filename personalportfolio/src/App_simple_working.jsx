import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="portfolio-navbar">
        <div className="navbar-inner">
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/blog" className="navbar-link">Blog</Link>
            <a href="/resume.pdf" className="navbar-link" download>Resume</a>
            <button className="navbar-contact-btn" type="button">Contact</button>
          </div>
          <button className="theme-toggle">Light</button>
        </div>
      </nav>

      {/* Header */}
      <header className="portfolio-header">
        <div className="portfolio-header-content">
          <div className="portfolio-header-left">
            <div className="profile-photo" style={{
              background: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              AM
            </div>
          </div>
          <div className="portfolio-header-details">
            <div className="portfolio-greeting">👋 Hi, I'm</div>
            <h1 className="portfolio-name">Akalewold Magera</h1>
            <div className="portfolio-title">Full-Stack Developer</div>
            <p className="portfolio-bio">
              Passionate about building clean, scalable applications with React, Spring Boot, and modern web technologies.
            </p>
          </div>
        </div>
      </header>

      {/* Simple Section */}
      <section className="portfolio-section">
        <h2 className="section-title">About Me</h2>
        <div className="section-content">
          <p>I'm a software developer who loves creating beautiful and functional web applications. Currently studying at Shenyang Institute of Technology and working on various projects.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
