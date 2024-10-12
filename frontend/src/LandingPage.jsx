import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import img1 from '../img/img1.jpeg'; 
import logo from '../img/logo.png'; 
import img2 from '../img/img2.jpeg'; 
import img3 from '../img/img3.jpeg'; 
import img4 from '../img/img4.jpeg';

const LandingPage = () => {
  return (
    <div>
      {/* Header Section */}
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
                  <li><a className="dropdown-item" href="#resource1">Faculty</a></li>
                  <li><a className="dropdown-item" href="#resource2">Academics</a></li>
                  <li><a className="dropdown-item" href="#resource3">Finance</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container text-center text-white">
          <h2>WELCOME TO NORTHEASTERN</h2>
          <p>A global research university, powered by experience</p>
          <a href="#about" className="btn btn-outline-light btn-lg">GET STARTED</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 about-text">
              <h2 className="about-title">ABOUT US</h2>
              <p className="about-subtitle">
              Founded in 1898, we’re renowned for our experiential learning model, high-impact research, deep partnerships, and worldwide reach. From day one, we’ve pursued innovative ways of teaching and research that place a premium on experience and engagement with the world. Today, our signature approach erases traditional boundaries, empowering not only students, but faculty, alumni, partners, and innovators to solve problems and pursue impact.
              </p>
              <a href="#" className="btn btn-primary">Read More</a>
            </div>
            <div className="col-md-6">
              <img src={img1} className="img-fluid about-img" alt="About Us" />
            </div>
          </div>
        </div>
      </section>

    

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="container">
          <h2 className="team-title">TEAM</h2>
          <p className="team-subtitle">Meet our talented Directors</p>
          <div className="row">
            {/* Team Member 1 */}
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src={img2}
                  className="team-img img-fluid rounded-circle"
                  alt="Team Member"
                />
                <h4>Khaled Bugrara</h4>
                <p>
                Teaching Professor and Executive Director, 
                Multidisciplinary Graduate Engineering Programs
                </p>
                <div className="social">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src={img3}
                  className="team-img img-fluid rounded-circle"
                  alt="Team Member"
                />
                <h4>Erik Brenner</h4>
                <p>
                Director of Diversity Initiatives & Engagement, 
                Office of the Dean

                </p>
                <div className="social">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src={img4}
                  className="team-img img-fluid rounded-circle"
                  alt="Team Member"
                />
                <h4>Marissa Brush</h4>
                <p>
                Assistant Director of Enrollment Operations, 
                Graduate School of Engineering

                </p>
                <div className="social">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
