import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "", // Add phone field here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_kzk8g28",
        "template_z1xorkl",
        formData,
        "4XMmj_noMI8ghbRRS"
      )
      .then(
        (response) => {
          console.log("Message sent successfully", response);
          alert("Your message has been sent successfully!");
        },
        (error) => {
          console.log("Error sending message", error);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <>
      <Header />
      <div className="top-search">
        <div className="container">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search" />
            </span>
            <input type="text" className="form-control" placeholder="Search" />
            <span className="input-group-addon close-search">
              <i className="fa fa-times" />
            </span>
          </div>
        </div>
      </div>
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Contact Us</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active"> Contact Us </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-box-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className="contact-info-left">
                <h2>CONTACT INFO</h2>
                <p>
                  When it comes to searching for books, there is only one place
                  to turn to – Book Hub.
                </p>
                <ul>
                  <li>
                    <p>
                      <i className="fas fa-map-marker-alt" />
                      Address: Da Nang
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-phone-square" />
                      Phone: <a href="tel:(+84)386106329">0386106329</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-envelope" />
                      Email:{" "}
                      <a href="mailto:bookhub@gmail.com">bookhub@gmail.com</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="contact-form-right">
                <h2>GET IN TOUCH</h2>
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name Field */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Your Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          name="message"
                          placeholder="Your Message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="submit-button text-center">
                        <button className="btn hvr-hover" type="submit">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
