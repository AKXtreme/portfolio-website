import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import './App.css'
import profileImg from './assets/a.jpg';
import akmessageImg from './assets/message .png';
import todoImg from './assets/todo.png';
import mapImg from './assets/map.png';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaXTwitter, FaReact, FaJs, FaJava, FaPython, FaDatabase, FaGitAlt, FaNodeJs, FaCode, FaVuejs, FaHandPeace, FaStar, FaGraduationCap, FaRocket, FaGlobe, FaBullseye, FaHandshake, FaRotate, FaWrench, FaShield, FaChartBar, FaGauge, FaMobile, FaGamepad, FaFutbol, FaSun, FaMoon } from 'react-icons/fa6';
import { SiGraphql, SiFlutter, SiSpring, SiPostgresql, SiFigma, SiTypescript } from 'react-icons/si';
import { Link } from 'react-router-dom';

// Enhanced lazy image component with error handling
const LazyImage = ({ src, alt, className, onClick, priority = false, fallback = null }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef();

  useEffect(() => {
    if (priority) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before element is visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setLoaded(false);
    console.warn(`Failed to load image: ${src}`);
  };

  return (
    <div ref={imgRef} className={className}>
      {inView && (
        <>
          {error && fallback ? (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--border-color)',
              color: 'var(--text-muted)',
              fontSize: '14px'
            }}>
              {fallback}
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onClick={onClick}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
          )}
        </>
      )}
    </div>
  );
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    // Default to dark mode instead of system preference
    return true;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Typing animation states
  const [greetingText, setGreetingText] = useState('');
  const [nameText, setNameText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Performance optimization: throttled scroll handler
  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}`;
    setScrollProgress(scroll);
  };

  // Dark mode toggle with persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Optimized scroll progress with cleanup
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

  // Performance optimizations on mount
  useEffect(() => {
    // Simple browser fixes and optimizations
    console.log('Portfolio app loaded successfully');
    
    // Typing animation effect
    const greetingFullText = "Hi, I'm";
    const nameFullText = "Akalewold Magera";
    
    // Type greeting first
    let greetingIndex = 0;
    const greetingTimer = setInterval(() => {
      if (greetingIndex < greetingFullText.length) {
        setGreetingText(greetingFullText.slice(0, greetingIndex + 1));
        greetingIndex++;
      } else {
        clearInterval(greetingTimer);
        // Start typing name after greeting is complete
        let nameIndex = 0;
        const nameTimer = setInterval(() => {
          if (nameIndex < nameFullText.length) {
            setNameText(nameFullText.slice(0, nameIndex + 1));
            nameIndex++;
          } else {
            clearInterval(nameTimer);
            // Hide cursor after typing is complete
            setTimeout(() => setShowCursor(false), 1000);
          }
        }, 80); // Slightly faster for name
      }
    }, 120); // Speed of typing for greeting
    
    // Cursor blinking effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    // Cleanup function for memory management
    return () => {
      clearInterval(greetingTimer);
      clearInterval(cursorTimer);
      // Clean up any remaining observers or listeners
    };
  }, []);

  // Optimized modal handlers with useCallback equivalent
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setShowContact(false);
    }
  };

  const handleContactToggle = () => setShowContact(prev => !prev);
  const handleThemeToggle = () => setDarkMode(prev => !prev);

  return (
    <div className="portfolio-container">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Modern Navigation */}
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

      {/* Hero Header */}
      <header className="portfolio-header">
        <div className="portfolio-header-content">
          <div className="portfolio-header-left">
            <img
              src={profileImg}
              alt="Akalewold Magera"
              className="profile-photo"
              style={{ cursor: 'zoom-in' }}
              onClick={() => setShowModal(true)}
              loading="eager"
              decoding="async"
              width="200"
              height="200"
            />
          </div>
          <div className="portfolio-header-details">
            <div className="portfolio-greeting">
              <FaHandPeace style={{ display: 'inline-block', marginRight: '8px' }} /> 
              {greetingText}
              {showCursor && greetingText && !nameText && <span className="typing-cursor">|</span>}
            </div>
            <h1 className="portfolio-name">
              {nameText}
              {showCursor && nameText && <span className="typing-cursor">|</span>}
            </h1>
            <p className="portfolio-bio">
              Full-stack developer | Problem solver | Lifelong learner
              <br /><br />
              I'm a software developer passionate about building tools and experiences that make life better. I enjoy turning ideas into scalable, maintainable applications using technologies like React, Spring Boot, and JavaScript/TypeScript.
              <br /><br />
              I care deeply about writing clean code, learning in public, and exploring how tech can be used for good. While I work on a variety of projects, I'm especially curious about systems that improve urban life, digital tools for productivity, and the open-source ecosystem.
              <br /><br />
              When I'm not coding, you'll find me on the football pitch <FaFutbol style={{ display: 'inline-block', margin: '0 4px' }} /> or exploring virtual worlds through video games <FaGamepad style={{ display: 'inline-block', margin: '0 4px' }} />. I believe the best ideas often come when you step away from the screen and engage with the world around you!
            </p>

            {/* Personal Story Section */}
            <section className="portfolio-section about-story-section">
              <h2><FaStar style={{ display: 'inline-block', marginRight: '8px' }} /> My Journey</h2>
              <div className="story-content">
                <div className="story-timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3><FaGraduationCap style={{ display: 'inline-block', marginRight: '8px' }} /> The Academic Foundation</h3>
                      <p>My journey began at Shenyang Institute of Technology, where I dove deep into Computer Science fundamentals. Beyond algorithms and data structures, I discovered my passion for solving real-world problems through code.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3><FaRocket style={{ display: 'inline-block', marginRight: '8px' }} /> From Theory to Practice</h3>
                      <p>What drives me isn't just writing code—it's the moment when a user's face lights up because something I built made their day easier. Whether it's a chat app connecting friends or a todo system organizing someone's life, I'm motivated by human impact.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3><FaGlobe style={{ display: 'inline-block', marginRight: '8px' }} /> Building for Tomorrow</h3>
                      <p>Currently, I'm fascinated by how technology can improve urban living and productivity. I believe the best developers don't just code—they understand people, anticipate needs, and create solutions that feel almost magical in their simplicity.</p>
                    </div>
                  </div>
                </div>
                <div className="story-values">
                  <h3>What I Believe In</h3>
                  <div className="values-grid">
                    <div className="value-item">
                      <span className="value-icon"><FaBullseye /></span>
                      <h4>Purpose-Driven Code</h4>
                      <p>Every line should serve a meaningful purpose in someone's life</p>
                    </div>
                    <div className="value-item">
                      <span className="value-icon"><FaHandshake /></span>
                      <h4>Collaborative Growth</h4>
                      <p>The best solutions emerge from diverse minds working together</p>
                    </div>
                    <div className="value-item">
                      <span className="value-icon"><FaRotate /></span>
                      <h4>Continuous Learning</h4>
                      <p>Technology evolves fast—staying curious keeps me ahead</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="portfolio-section education-section">
              <h2>🎓 Education</h2>
              <ul className="education-list">
                <li>
                  <strong>Bachelor of Computer Science</strong> – Shenyang Institute of Technology
                  <div className="education-explanation">
                    Covered core computer science concepts: data structures, algorithms, software engineering, databases, networking, C++, OOP, software testing, and hands-on projects in Java, Python, and web technologies.
                  </div>
                </li>
              </ul>
            </section>

            {/* Tech Stack */}
            <section className="portfolio-section techstack-section">
              <h2>🛠️ Tech Stack</h2>
              <div className="techstack-subsection">
                <h3>Frontend</h3>
                <div className="techstack-icons">
                  <div><FaReact title="React" /> <span>React</span></div>
                  <div><FaJs title="JavaScript" /> <span>JavaScript</span></div>
                  <div><SiTypescript title="TypeScript" /> <span>TypeScript</span></div>
                  <div><FaVuejs title="Vue" /> <span>Vue</span></div>
                </div>
              </div>
              <div className="techstack-subsection">
                <h3>Backend</h3>
                <div className="techstack-icons">
                  <div><FaJava title="Java" /> <span>Java</span></div>
                  <div><SiSpring title="Spring Boot" /> <span>Spring Boot</span></div>
                  <div><FaNodeJs title="Node.js" /> <span>Node.js</span></div>
                  <div><FaPython title="Python" /> <span>Python</span></div>
                  <div><SiGraphql title="GraphQL" /> <span>GraphQL</span></div>
                </div>
              </div>
              <div className="techstack-subsection">
                <h3>Database & Tools</h3>
                <div className="techstack-icons">
                  <div><SiPostgresql title="PostgreSQL" /> <span>PostgreSQL</span></div>
                  <div><FaDatabase title="SQL" /> <span>SQL</span></div>
                  <div><FaGitAlt title="Git" /> <span>Git</span></div>
                  <div><SiFigma title="Figma" /> <span>Figma</span></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section className="portfolio-section projects-section">
        <h2>💻 Featured Projects</h2>
        
        {/* Featured Case Study */}
        <div className="featured-project-case-study">
          <div className="case-study-header">
            <div className="case-study-title">
              <h3>🦌 SERAT Enterprise Management System</h3>
              <p className="case-study-subtitle">Full-Stack Enterprise Solution with Modern Architecture</p>
            </div>
            <div className="case-study-stats">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Modules</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Java 17</span>
                <span className="stat-label">Latest LTS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Spring 3.4</span>
                <span className="stat-label">Framework</span>
              </div>
            </div>
          </div>

          <div className="case-study-content">
            <div className="case-study-overview">
              <h4>Project Overview</h4>
              <p>SERAT is a comprehensive Enterprise Management System designed to streamline business operations through modern web technologies. Built with Spring Boot 3.4.6 and React 18, it demonstrates enterprise-grade architecture and scalable design patterns.</p>
            </div>

            <div className="case-study-tech">
              <h4>Technical Architecture</h4>
              <div className="tech-grid">
                <div className="tech-category">
                  <h5>Backend</h5>
                  <ul>
                    <li>Spring Boot 3.4.6</li>
                    <li>Java 17 LTS</li>
                    <li>Spring Security</li>
                    <li>JPA/Hibernate</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h5>Frontend</h5>
                  <ul>
                    <li>React 18</li>
                    <li>Modern JavaScript</li>
                    <li>Responsive Design</li>
                    <li>Component Architecture</li>
                  </ul>
                </div>
                <div className="tech-category">
                  <h5>Database</h5>
                  <ul>
                    <li>PostgreSQL</li>
                    <li>Optimized Queries</li>
                    <li>Data Integrity</li>
                    <li>Scalable Schema</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="case-study-features">
              <h4>Key Features & Impact</h4>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🔐</div>
                  <h5>Security First</h5>
                  <p>Enterprise-grade authentication and authorization with Spring Security</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <h5>Data Management</h5>
                  <p>Comprehensive data handling with optimized database operations</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🚀</div>
                  <h5>Performance</h5>
                  <p>Optimized for speed with efficient backend and frontend architecture</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📱</div>
                  <h5>Responsive</h5>
                  <p>Modern UI that works seamlessly across all devices and platforms</p>
                </div>
              </div>
            </div>

            <div className="case-study-cta">
              <a href="https://github.com/AKXtreme/serat-system" target="_blank" rel="noopener noreferrer" className="case-study-link">
                <FaGithub /> View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="project-cards">
          {/* SERAT System */}
          <div className="project-card">
            <a href="https://github.com/AKXtreme/serat-system" target="_blank" rel="noopener noreferrer">
              <div className="project-image" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                🦌 SERAT
              </div>
            </a>
            <div className="project-info">
              <strong>SERAT Enterprise Management System</strong>
              <p>🦌 SERAT v1.0 - A comprehensive Enterprise Management System built with Spring Boot 3.4.6 and React 18. Features modern architecture and enterprise-grade functionality.</p>
            </div>
          </div>

          {/* Akmessage */}
          <div className="project-card">
            <a href="https://github.com/AKXtreme/akmessage" target="_blank" rel="noopener noreferrer">
              <LazyImage 
                src={akmessageImg} 
                alt="Akmessage chat application" 
                className="project-image"
                priority={false}
                fallback="💬 Chat App"
              />
            </a>
            <div className="project-info">
              <strong>Akmessage</strong>
              <p>A modern, real-time chat application built with Flask, Flask-SocketIO, and SQLAlchemy. Supports private and group conversations, file sharing, and voice messages—all in a clean, responsive interface.</p>
            </div>
          </div>

          {/* Spring Boot Todo App */}
          <div className="project-card">
            <a href="https://github.com/AKXtreme/springboot-todo-app" target="_blank" rel="noopener noreferrer">
              <LazyImage 
                src={todoImg} 
                alt="Spring Boot Todo App" 
                className="project-image"
                priority={false}
                fallback="📝 Todo App"
              />
            </a>
            <div className="project-info">
              <strong>Spring Boot Todo App</strong>
              <p>A web-based Todo List Application built using Spring Boot, Spring Security, Spring Data JPA, JSP, and H2 Database. Features user authentication, CRUD operations, and a simple, intuitive UI.</p>
            </div>
          </div>

          {/* Scratch Parrot Game */}
          <div className="project-card">
            <a href="https://github.com/AKXtreme/Scratch-parrot-game" target="_blank" rel="noopener noreferrer">
              <div className="project-image" style={{
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#333',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                🦜 Game
              </div>
            </a>
            <div className="project-info">
              <strong>Scratch Parrot Game</strong>
              <p>A fun interactive game project created for CS50 Harvard online course. Built with Scratch programming language, featuring engaging gameplay and creative problem-solving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
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

      {/* Image Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <img src={profileImg} alt="Akalewold Magera" className="modal-photo" loading="lazy" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="contact-icons">
          <a href="https://www.linkedin.com/in/akalewold-magera-51200228b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://github.com/AKXtreme" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.facebook.com/share/16ri9J9Q6D/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
          <a href="https://www.instagram.com/akalewoldak?igsh=Mm9haXk2azRxOW04" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://x.com/akalewoldx?t=_lL70lqxjBCDsZoy8gtyFw&s=09" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>
        </div>
        <button 
          className="back-to-top-btn" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top
        </button>
        <p style={{ marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
          © 2025 Akalewold Magera. Built with passion for clean code and beautiful design.
        </p>
      </footer>
    </div>
  );
}

export default App;
