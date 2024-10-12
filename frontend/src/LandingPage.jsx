import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './LandingPage.css'; 
import img1 from '../img/img1.jpeg';
import logo from '../img/logo.png';
import huskyLogo from '../img/husky.jpeg';
import img2 from '../img/img2.jpeg';
import img3 from '../img/img3.jpeg';
import img4 from '../img/img4.jpeg';

const LandingPage = () => {
  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" className="navbar-logo" /> 
            <h1 className="d-inline-block">NORTHEASTERN UNIVERSITY</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">Teams</a> 
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a> 
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Resources
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#faculty-summary">Faculty</a></li>
                  <li><a className="dropdown-item" href="#academics-summary">Academics</a></li>
                  <li><a className="dropdown-item" href="#finance-summary">Finance</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="container text-center text-white">
          <h2>WELCOME TO NORTHEASTERN</h2>
          <p>A global research university, powered by experience</p>
          <a href="#about" className="btn btn-outline-light btn-lg">GET STARTED</a>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 about-text">
              <h2 className="about-title">ABOUT US</h2>
              <p className="about-subtitle">
              Founded in 1898, we’re renowned for our experiential learning model, high-impact research, deep partnerships, and worldwide reach. From day one, we’ve pursued innovative ways of teaching and research that place a premium on experience and engagement with the world. Today, our signature approach erases traditional boundaries, empowering not only students, but faculty, alumni, partners, and innovators to solve problems and pursue impact.
              </p>
              <a href="#" className="btn btn-read-more">Read More</a>
            </div>
            <div className="col-md-6">
              <img src={img1} className="img-fluid about-img" alt="About Us" />
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team-section">
        <div className="container">
          <h2 className="team-title">TEAM</h2>
          <p className="team-subtitle">Meet our talented Directors</p>
          <div className="row">
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src={img2}
                  className="team-img img-fluid rounded-circle"
                  alt="Team Member"
                />
                <h4>Khaled Bugrara</h4>
                <p>Teaching Professor and Executive Director, Multidisciplinary Graduate Engineering Programs</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src={img3}
                  className="team-img img-fluid rounded-circle"
                  alt="Team Member"
                />
                <h4>Erik Brenner</h4>
                <p>Director of Diversity Initiatives & Engagement, Office of the Dean</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src={img4}
                  className="team-img img-fluid rounded-circle"
                  alt="Team Member"
                />
                <h4>Marissa Brush</h4>
                <p>Assistant Director of Enrollment Operations, Graduate School of Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <h2 className="services-title text-center">SERVICES</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h4 className="service-title">Human Resources</h4>
                <p className="service-description">
                  Services for faculty and staff, including training and benefits information.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-icon">
                  <i className="fas fa-broadcast-tower"></i>
                </div>
                <h4 className="service-title">Global Services</h4>
                <p className="service-description">
                  Assistance and guidance for international students and scholars.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-icon">
                  <i className="fas fa-store"></i>
                </div>
                <h4 className="service-title">Registrar Services</h4>
                <p className="service-description">
                  Forms and information related to registration, enrollment, and classes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faculty-summary">
        <div className="container">
          <details>
            <summary>Faculty Resources</summary>
            <p>This section provides resources and information for faculty members at Northeastern University. It includes details about faculty training, development programs, and available support services to enhance teaching effectiveness, research opportunities, and professional growth.</p>
          </details>
        </div>
      </section>

      <section id="academics-summary">
        <div className="container">
          <details>
            <summary>Academic Resources</summary>
            <p>The Academics section offers information about the university's academic programs, curriculum, and student resources. It covers undergraduate and graduate programs, academic advising, and extracurricular learning opportunities. This section also highlights initiatives for academic success and innovation in education.</p>
          </details>
        </div>
      </section>

      <section id="finance-summary">
        <div className="container">
          <details>
            <summary>Financial Resources</summary>
            <p>In the Finance section, students and faculty can find important financial resources, including tuition information, financial aid, scholarships, and fee structures. It provides guidance on managing student finances, funding opportunities, and procedures for tuition payments and other financial support options.</p>
          </details>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="contact-title">Contact Us</h2>
              <h4>Office Address</h4>
              <p>Northeastern University, 360 Huntington Ave, Boston, MA 02115</p>
              <h4>Email and Phone</h4>
              <p>Email: contact@northeastern.edu</p>
              <p>Phone: +1 617-373-2000</p>
            </div>
            <div className="col-md-6 text-center">
              <img src={huskyLogo} alt="Husky Logo" className="husky-logo" />
            </div>
          </div>
          <div className="row mt-4 text-center">
            <div className="col-md-12 follow-us">
              <h4>Follow Us</h4>
              <p>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> |
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-12">
              <p>&copy; {new Date().getFullYear()} Northeastern University. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
