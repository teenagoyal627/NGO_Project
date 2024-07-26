import React from 'react'
import './FrontPage.css'
import { Link } from "react-router-dom";

const TextFrontPage = () => {
  return (
    <div>
       <header>
        <div className="header-section flex container">
          <div className="header-left">
            <h1>Dedicated to Serving Those in Need</h1>
            <p>
              ‘Anandam’ – A home for the homeless, was set up to support
              unidentified patient. Providing shelter to the homeless and
              chronically sick aligns with our ethical responsibility to care
              for the most vulnerable members of society.
            </p>
            <button className="GetStartButton">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}
              >
                Get Started
              </Link>
            </button>
          </div>
          <div className="header-right">
            <img src="Images/VijayMandir.jpeg" alt="Home page" />
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="features-header flex">
            <h4 className="features-heading-text">
              Providing Essential Support: Shelter, Medicine, and Food.
            </h4>{" "}
          </div>
          <hr />
          <div className="features-area flex">
  <a href="https://sapnaindia.org/anandam-home-for-the-homeless/" target="blank" className="features-card card-1">
    <h5 className="features-text">
      SAPNA created its first home for the homeless at Vijay Mandir, Alwar in 2007.
    </h5>
  </a>

  <a href="https://sapnaindia.org/our-work-healthcare-2-health__trashed-safdarjung-hospital-dharamshala-new-delhi/education/sapna-shikshalya/" target="blank" className="features-card card-2">
    <h5 className="features-text">
    Empowering underprivileged children through education.
    </h5>
  </a>

  <a href="https://sapnaindia.org/mahila-suraksha-evam-salah-kendra-mssk/" target="blank" className="features-card card-3">
    <h5 className="features-text">
      SAPNA is partnering with local police and Department of Women and Child in Alwar.
    </h5>
  </a>

  <a href="https://sapnaindia.org/our-work-healthcare-2-health__trashed-safdarjung-hospital-dharamshala-new-delhi/healthcare-2/eye-care/" target="blank" className="features-card card-4">
    <h5 className="features-text">
    SAPNA began to provide high-quality eye care to the underserved rural areas of Alwar in 2007.
    </h5>
  </a>

  <a href="https://sapnaindia.org/sapna-nursery/" target="blank" className="features-card card-5">
    <h5 className="features-text">
    Creating a greener future through community nurseries.
    </h5>
  </a>

  <a href="https://sapnaindia.org/our-work-healthcare-2-health__trashed-safdarjung-hospital-dharamshala-new-delhi/healthcare-2/safdarjung-hospital-dharamshala-new-delhi/" target="blank" className="features-card card-6">
    <h5 className="features-text">
    Providing essential healthcare services to those in need.
    </h5>
  </a>
</div>

        </div>
      </section>

      <section className="cta-section" style={{marginLeft:"5rem",marginRight:"5rem"}}>
  <div className="container flex cta-section-container">
    <h2 style={{ color: "white" }}>Join Us in Making a Difference</h2>
    <div className="card">
      <h5 className="card-header">NGO Management System</h5>
      <div className="card-body">
        <p className="card-text">
          Our system allows you to manage patient information efficiently. You can
          record details such as name, father's name, arrival date, referring hospital,
          and more. Click the Signup button to get started and make an impact today.
        </p>
        <button className="GetStartButton" style={{marginRight:"3rem"}}>
          <Link
            to="/signup"
            style={{ color: "black", textDecoration: "none" }}
          >
            Signup
          </Link>
        </button>
        <button className="GetStartButton" style={{marginRight:"3rem"}}>
          <Link
            to="/login"
            style={{ color: "black", textDecoration: "none" }}
          >
            Login
          </Link>
        </button>
      </div>
    </div>
  </div>
</section>

      <br />
      <br />
    </div>
  )
}

export default TextFrontPage
