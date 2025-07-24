import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaXTwitter, FaMagnifyingGlass, FaFilter, FaCalendarDays, FaUser, FaArrowUpRightFromSquare, FaArrowUp, FaSun, FaMoon } from 'react-icons/fa6';
import './App.css'; // Import the same CSS as home page

const posts = [
  {
    id: 1,
    title: 'Building SERAT: Enterprise Management System',
    date: 'July 2025',
    readTime: '8 min read',
    author: 'Akalewold Magera',
    summary: 'A deep dive into creating a comprehensive Enterprise Management System using Spring Boot 3.4.6 and React 18, covering architecture decisions and implementation details.',
    url: 'https://github.com/AKXtreme/serat-system',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    tags: ['Spring Boot', 'React', 'Enterprise'],
    featured: true,
    category: 'Full-Stack Development'
  },
  {
    id: 2,
    title: 'Real-time Chat with Flask-SocketIO',
    date: 'June 2025',
    readTime: '6 min read',
    author: 'Akalewold Magera',
    summary: 'Building Akmessage: A modern chat application with real-time messaging, file sharing, and voice messages using Flask, SocketIO, and SQLAlchemy.',
    url: 'https://github.com/AKXtreme/akmessage',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=600&q=80',
    tags: ['Flask', 'SocketIO', 'Python'],
    featured: false,
    category: 'Backend Development'
  },
  {
    id: 3,
    title: 'My Journey Learning Computer Science',
    date: 'May 2025',
    readTime: '4 min read',
    author: 'Akalewold Magera',
    summary: 'Reflections on my computer science education at Shenyang Institute of Technology and the projects that shaped my development journey.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    tags: ['Education', 'Career', 'Reflection'],
    featured: false,
    category: 'Personal Development'
  }
];

// Custom inline styles to avoid CSS conflicts
const styles = {
  container: {
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6'
  },
  navbar: {
    backgroundColor: '#ffffff',
    padding: '20px 0',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '40px'
  },
  navbarInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navLink: {
    color: '#333333',
    textDecoration: 'none',
    margin: '0 15px',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  activeNavLink: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#000000',
    margin: '0 0 20px 0'
  },
  subtitle: {
    fontSize: '18px',
    color: '#666666',
    margin: '0'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
    gap: '20px',
    flexWrap: 'wrap'
  },
  searchInput: {
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '16px',
    width: '300px',
    maxWidth: '100%'
  },
  select: {
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#ffffff'
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  postCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s'
  },
  postImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  postContent: {
    padding: '24px'
  },
  postTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000',
    margin: '0 0 12px 0'
  },
  postMeta: {
    fontSize: '14px',
    color: '#888888',
    marginBottom: '16px'
  },
  postSummary: {
    fontSize: '16px',
    color: '#333333',
    marginBottom: '20px'
  },
  postTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px'
  },
  tag: {
    backgroundColor: '#f0f0f0',
    color: '#333333',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px'
  },
  readMoreBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: '40px 20px',
    textAlign: 'center',
    marginTop: '80px'
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px'
  },
  socialIcon: {
    color: '#333333',
    fontSize: '24px',
    transition: 'color 0.3s'
  }
};

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showContact, setShowContact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    // Default to dark mode instead of system preference
    return true;
  });

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Handle contact toggle
  const handleContactToggle = () => {
    setShowContact(!showContact);
  };

  // Handle modal click (close when clicking overlay)
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowContact(false);
    }
  };

  // Check for mobile viewport and set theme
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    
    // Add mobile-friendly CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile touch improvements */
      * {
        -webkit-tap-highlight-color: rgba(0,0,0,0.1);
      }
      
      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
      
      /* Better button touch targets */
      button, a {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Prevent zoom on input focus */
      input, select {
        font-size: 16px !important;
      }
      
      @media (max-width: 768px) {
        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.head.removeChild(style);
    };
  }, [darkMode]);

  // Scroll progress effect (same as home page)
  useEffect(() => {
    const throttledScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight * 100}`;
      setScrollProgress(scroll);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Mobile-responsive styles (keeping blog-specific styles, removing navbar styles)
  const styles = {
    container: {
      backgroundColor: 'var(--primary-bg, #ffffff)', // Use CSS variables for theme support
      color: 'var(--text-primary, #000000)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '0 15px' : '0 20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '30px' : '60px'
    },
    title: {
      fontSize: isMobile ? '28px' : '48px',
      fontWeight: 'bold',
      color: 'var(--text-primary, #000000)',
      margin: '0 0 20px 0',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: isMobile ? '16px' : '18px',
      color: 'var(--text-secondary, #666666)',
      margin: '0',
      lineHeight: '1.4'
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: isMobile ? '25px' : '40px',
      gap: isMobile ? '10px' : '20px',
      flexWrap: 'wrap',
      padding: '0 10px'
    },
    searchInput: {
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      width: isMobile ? '100%' : '300px',
      maxWidth: '100%'
    },
    select: {
      padding: '12px 16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: '#ffffff',
      width: isMobile ? '100%' : 'auto'
    },
    postsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile 
        ? '1fr' 
        : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: isMobile ? '20px' : '30px',
      marginBottom: isMobile ? '40px' : '60px'
    },
    postCard: {
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer'
    },
    postImage: {
      width: '100%',
      height: isMobile ? '180px' : '200px',
      objectFit: 'cover'
    },
    postContent: {
      padding: isMobile ? '16px' : '24px'
    },
    postTitle: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: 'bold',
      color: '#000000',
      margin: '0 0 12px 0',
      lineHeight: '1.3'
    },
    postMeta: {
      fontSize: isMobile ? '12px' : '14px',
      color: '#888888',
      marginBottom: '16px'
    },
    postSummary: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#333333',
      marginBottom: '20px',
      lineHeight: '1.5'
    },
    postTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '20px'
    },
    tag: {
      backgroundColor: '#f0f0f0',
      color: '#333333',
      padding: isMobile ? '3px 8px' : '4px 12px',
      borderRadius: '16px',
      fontSize: isMobile ? '10px' : '12px'
    },
    readMoreBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      padding: isMobile ? '8px 16px' : '10px 20px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: isMobile ? '13px' : '14px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
      width: isMobile ? '100%' : 'auto',
      justifyContent: 'center'
    },
    footer: {
      backgroundColor: '#f8f9fa',
      padding: isMobile ? '30px 15px' : '40px 20px',
      textAlign: 'center',
      marginTop: isMobile ? '50px' : '80px'
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '15px' : '20px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    socialIcon: {
      color: '#333333',
      fontSize: isMobile ? '20px' : '24px',
      transition: 'color 0.3s'
    }
  };

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      {/* Scroll Progress Bar - Same as Home Page */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Modern Navigation - Same as Home Page */}
      <nav className="portfolio-navbar">
        <div className="navbar-inner">
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/blog" className="navbar-link">Blog</Link>
            <a href="/resume.pdf" className="navbar-link" download>Resume</a>
            <button className="navbar-link navbar-contact-btn" onClick={handleContactToggle} type="button">Contact</button>
          </div>
          <button className="theme-toggle" onClick={handleThemeToggle} title="Toggle theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* Contact Modal - Same as Home Page */}
      {showContact && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="contact-modal-content">
            <h2>Let's Connect!</h2>
            <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
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

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>Blog & Articles</h1>
          <p style={styles.subtitle}>Sharing insights, tutorials, and reflections on my development journey</p>
        </header>

        {/* Search and Filter */}
        <div style={styles.searchContainer}>
          <div style={{position: 'relative'}}>
            <FaMagnifyingGlass style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999999'}} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{...styles.searchInput, paddingLeft: '40px'}}
            />
          </div>
          
          <div style={{position: 'relative'}}>
            <FaFilter style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999999'}} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{...styles.select, paddingLeft: '40px'}}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div style={styles.postsGrid}>
          {filteredPosts.map(post => (
            <article key={post.id} style={styles.postCard}>
              <img src={post.image} alt={post.title} style={styles.postImage} />
              <div style={styles.postContent}>
                <div style={styles.postMeta}>
                  <FaCalendarDays style={{marginRight: '5px'}} />
                  {post.date} • 
                  <FaUser style={{margin: '0 5px 0 10px'}} />
                  {post.author} • {post.readTime}
                </div>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postSummary}>{post.summary}</p>
                <div style={styles.postTags}>
                  {post.tags.map(tag => (
                    <span key={tag} style={styles.tag}>{tag}</span>
                  ))}
                </div>
                <a 
                  href={post.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.readMoreBtn}
                >
                  Read Article <FaArrowUpRightFromSquare />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <h3 style={{color: '#666666', marginBottom: '20px'}}>No articles found</h3>
            <p style={{color: '#888888', marginBottom: '30px'}}>Try adjusting your search terms or filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              style={styles.readMoreBtn}
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.socialIcons}>
          <a href="https://www.linkedin.com/in/akalewold-magera-51200228b" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}><FaLinkedin /></a>
          <a href="https://github.com/AKXtreme" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}><FaGithub /></a>
          <a href="https://www.facebook.com/share/16ri9J9Q6D/" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}><FaFacebook /></a>
          <a href="https://www.instagram.com/akalewoldak" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}><FaInstagram /></a>
          <a href="https://x.com/akalewoldx" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}><FaXTwitter /></a>
        </div>
        <p style={{color: '#666666', fontSize: '14px', margin: 0}}>
          © 2025 Akalewold Magera. Built with passion for clean code and beautiful design.
        </p>
      </footer>
    </div>
  );
}

export default Blog;
