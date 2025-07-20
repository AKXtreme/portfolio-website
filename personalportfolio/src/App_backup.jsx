import { useState, useEffect, useRef } from 'react';
import './App.css'
import profileImg from './assets/photo_2025-07-20_01-04-46.jpg';
import akmessageImg from './assets/message .png';
import todoImg from './assets/todo.png';
import mapImg from './assets/map.png';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaXTwitter, FaReact, FaJs, FaJava, FaPython, FaDatabase, FaGitAlt, FaNodeJs, FaCode, FaVuejs } from 'react-icons/fa6';
import { SiGraphql, SiFlutter } from 'react-icons/si';
import { Link } from 'react-router-dom';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    let scriptThree, scriptVanta;
    function loadVanta() {
      if (!window.VANTA) {
        scriptVanta = document.createElement('script');
        scriptVanta.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js';
        scriptVanta.async = true;
        document.body.appendChild(scriptVanta);
        scriptVanta.onload = initVanta;
      } else {
        initVanta();
      }
    }
    function initVanta() {
      if (!vantaEffect.current && window.VANTA && window.VANTA.FOG && vantaRef.current) {
        vantaEffect.current = window.VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          highlightColor: 0x7a4a1e, // warm brown highlight
          midtoneColor: 0xf5e9da, // soft beige midtone
          lowlightColor: 0x1a2233, // deep blue lowlight
          baseColor: 0xf5e9da, // soft beige base
          blurFactor: 0.7,
          speed: 1.2
        });
      }
    }
    if (!window.THREE) {
      scriptThree = document.createElement('script');
      scriptThree.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      scriptThree.async = true;
      document.body.appendChild(scriptThree);
      scriptThree.onload = loadVanta;
    } else {
      loadVanta();
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
      if (scriptThree) document.body.removeChild(scriptThree);
      if (scriptVanta) document.body.removeChild(scriptVanta);
    };
  }, []);

  return (
    <main className={`portfolio-container ${darkMode ? 'dark-mode' : ''}`}>
      <div id="animated-bg" ref={vantaRef} style={{position: 'fixed', zIndex: 0, top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none'}} aria-hidden="true"></div>
      <nav className="portfolio-navbar">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/blog" className="navbar-link">Blog</Link>
        <a href="/resume.pdf" className="navbar-link navbar-resume-btn" download>Download Resume</a>
        <button className="navbar-link navbar-contact-btn" onClick={() => setShowContact(true)} type="button">Contact</button>
        <button 
          className="dark-mode-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>
      <header className="portfolio-header animated-header-bg">
        <div className="portfolio-header-left">
          <div className="portfolio-greeting">
            <span className="greeting-text">👋 Hi, I'm Akalewold!</span>
            <div className="sparkles">
              <span className="sparkle">✨</span>
              <span className="sparkle">⭐</span>
              <span className="sparkle">💫</span>
            </div>
          </div>
          <img
            src={profileImg}
            alt="Akalewold Magera profile photo"
            className="profile-photo"
            style={{ cursor: 'zoom-in' }}
            onClick={() => setShowModal(true)}
          />
          <section className="portfolio-section education-section">
            <h2>🎓 Education</h2>
            <ul className="education-list">
              <li><strong>BSc in Computer Science</strong> – Shenyang Institute of Technology
                <div className="education-explanation">
                  Covered core computer science concepts: data structures, algorithms, software engineering, databases, networking, C++, OOP, software testing, and hands-on projects in Java, Python, and web technologies.
                </div>
              </li>
            </ul>
          </section>
          <section className="portfolio-section certification-section">
            <h2><span className="cert-badge">🎖️</span>Certifications</h2>
            <ul className="education-list">
              <li><strong>CS50: Introduction to Computer Science</strong> – HarvardX (<a href='https://courses.edx.org/certificates/5a231cb6ff52469597536de19738c337?_gl=1*1hu6k8*_gcl_aw*R0NMLjE3NTAyNzA5OTUuQ2p3S0NBand4OG5DQmhBd0Vpd0Ffel9fMDhieDdtdkcwanpzMHR2M0xaSDBtU0lwd0tXVFhMUzlOeWQ1VlFhYWI3YXJsRnlRSWdMbjdCb0NrSmtRQXZEX0J3RQ..*_gcl_au*MTQ3Mzk1ODA1Mi4xNzQ3MzE1ODY0*_ga*MTAzNzAwNzc4Ni4xNzQ3MzE1ODYz*_ga_D3KS4KMDT0*czE3NTI5NDUzMzgkbzQyJGcxJHQxNzUyOTQ1NDE5JGo0NiRsMCRoMA..' target='_blank' rel='noopener noreferrer' className='edx-badge'>View Certificate</a>)</li>
            </ul>
          </section>
        </div>
        <div className="portfolio-header-details">
          <p className="portfolio-bio">
            I'm a software developer passionate about building tools and experiences that make life better. I enjoy turning ideas into scalable, maintainable applications.<br /><br />
            I work with modern web technologies, backend frameworks, databases, and all things that make software robust and user-friendly.<br /><br />
            Outside of tech, I love playing video games, reading books, and staying active—especially on the football field.<br /><br />
            I care deeply about writing clean code, learning in public, and exploring how tech can be used for good. While I work on a variety of projects, I'm especially curious about systems that improve urban life, digital tools for productivity, and the open-source ecosystem.
          </p>
          <section className="portfolio-section techstack-section">
            <h2>Tech Stack</h2>
            <div className="techstack-subsection">
              <h3>Frontend</h3>
              <div className="techstack-icons">
                <div><FaReact title="React" /> <span>React</span></div>
                <div><FaJs title="JavaScript" /> <span>JavaScript</span></div>
                <div><FaCode title="TypeScript" /> <span>TypeScript</span></div>
                <div><FaVuejs title="Vue" /> <span>Vue</span></div>
              </div>
            </div>
            <div className="techstack-subsection">
              <h3>Backend</h3>
              <div className="techstack-icons">
                <div><FaJava title="Java" /> <span>Java</span></div>
                <div><FaNodeJs title="Node.js" /> <span>Node.js</span></div>
                <div><SiGraphql title="GraphQL" /> <span>GraphQL</span></div>
                <div><FaPython title="Python" /> <span>Python</span></div>
                <div><FaDatabase title="SQL" /> <span>SQL</span></div>
                <div><FaGitAlt title="Git" /> <span>Git</span></div>
                <div><FaNodeJs title="Spring Boot" /> <span>Spring Boot</span></div>
              </div>
            </div>
            <div className="techstack-subsection">
              <h3>Mobile</h3>
              <div className="techstack-icons">
                <div><FaReact title="React Native" /> <span>React Native</span></div>
                <div><FaJava title="Java" /> <span>Java</span></div>
                <div><SiFlutter title="Flutter" /> <span>Flutter</span></div>
              </div>
            </div>
          </section>
        </div>
      </header>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <img src={profileImg} alt="Akalewold Magera" className="modal-photo" />
          </div>
        </div>
      )}
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
      <section className="portfolio-section projects-section">
        <h2 className="my-works-toggle" style={{cursor: 'pointer'}}>
          My Works
        </h2>
        <div className="project-list project-cards">
          <div className="project-card">
            <a href="https://github.com/AKXtreme/akmessage" target="_blank" rel="noopener noreferrer">
              <img src={akmessageImg} alt="Screenshot of Akmessage chat application" className="project-image" />
            </a>
            <div className="project-info">
              <strong>Akmessage</strong>
              <p>A modern, real-time chat application built with Flask, Flask-SocketIO, and SQLAlchemy. Supports private and group conversations, file sharing, and voice messages—all in a clean, responsive interface.</p>
            </div>
          </div>
          <div className="project-card">
            <a href="https://github.com/AKXtreme/springboot-todo-app" target="_blank" rel="noopener noreferrer">
              <img src={todoImg} alt="Screenshot of Todo App project" className="project-image" />
            </a>
            <div className="project-info">
              <strong>Todo App</strong>
              <p>A web-based Todo List Application built using Spring Boot, Spring Security, Spring Data JPA, JSP, and H2 Database. Features user authentication, CRUD operations, and a simple, intuitive UI.</p>
            </div>
          </div>
          <div className="project-card">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={mapImg} alt="Screenshot of Addis Ababa Map Application project" className="project-image" />
            </a>
            <div className="project-info">
              <strong>Addis Ababa Map Application</strong>
              <p>Currently working on an interactive map application for Addis Ababa, focused on urban navigation and local insights. (In progress)</p>
            </div>
          </div>
        </div>
      </section>
      <button 
        className="back-to-top-btn" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Back to Top
      </button>
      <footer className="portfolio-footer">
        <div className="footer-copyright">© 2025 Akalewold Magera. All rights reserved.</div>
      </footer>
    </main>
  );
}

export default App
