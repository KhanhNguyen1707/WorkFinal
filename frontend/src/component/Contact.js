import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
  return(
      <>
          <Header></Header>
          <div className="top-search ">
              <div className="container ">
                  <div className="input-group ">
        <span className="input-group-addon ">
          <i className="fa fa-search " />
        </span>
                      <input type="text " className="form-control " placeholder="Search " />
                      <span className="input-group-addon close-search ">
          <i className="fa fa-times " />
        </span>
                  </div>
              </div>
          </div>
          {/* End Top Search */}
          {/* Start All Title Box */}
          <div className="all-title-box ">
              <div className="container ">
                  <div className="row ">
                      <div className="col-lg-12 ">
                          <h2>Contact Us</h2>
                          <ul className="breadcrumb ">
                              <li className="breadcrumb-item ">
                                  <a href="# ">Home</a>
                              </li>
                              <li className="breadcrumb-item active "> Contact Us </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          {/* End All Title Box */}
          {/* Start Contact Us  */}
          <div className="contact-box-main ">
              <div className="container ">
                  <div className="row ">
                      <div className="col-lg-4 col-sm-12 ">
                          <div className="contact-info-left ">
                              <h2>CONTACT INFO</h2>
                              <p>
                                  When it comes to searching for books, there is only one place to
                                  turn to – Book Hub.We have a veritable collection of books that
                                  span categories as diverse as you could possibly expect. From
                                  segments like accountancy, to parenting and pregnancy, to banking
                                  and finance, to even topics on yoga and meditation – almost any
                                  category you seek – you will find with us
                              </p>
                              <ul>
                                  <li>
                                      <p>
                                          <i className="fas fa-map-marker-alt " />
                                          Address: Da Nang
                                          <br />
                                      </p>
                                  </li>
                                  <li>
                                      <p>
                                          <i className="fas fa-phone-square " />
                                          Phone: <a href="(+84)386106329">0386106329 </a>
                                      </p>
                                  </li>
                                  <li>
                                      <p>
                                          <i className="fas fa-envelope " />
                                          Email:{" "}
                                          <a href="mailto:bookhub@gmail.com ">
                                              bookhub@gmail.com
                                          </a>
                                      </p>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="col-lg-8 col-sm-12 ">
                          <div className="contact-form-right ">
                              <h2>GET IN TOUCH</h2>
                              <p> </p>
                              <form id="contactForm ">
                                  <div className="row ">
                                      <div className="col-md-12 ">
                                          <div className="form-group ">
                                              <input
                                                  type="text "
                                                  className="form-control "
                                                  id="name "
                                                  name="name "
                                                  placeholder="Your Name "
                                                  required=""
                                                  data-error="Please enter your name "
                                              />
                                              <div className="help-block with-errors " />
                                          </div>
                                      </div>
                                      <div className="col-md-12 ">
                                          <div className="form-group ">
                                              <input
                                                  type="text "
                                                  placeholder="Your Email "
                                                  id="email "
                                                  className="form-control "
                                                  name="name "
                                                  required=""
                                                  data-error="Please enter your email "
                                              />
                                              <div className="help-block with-errors " />
                                          </div>
                                      </div>
                                      <div className="col-md-12 ">
                                          <div className="form-group ">
                                              <input
                                                  type="text "
                                                  className="form-control "
                                                  id="subject "
                                                  name="name "
                                                  placeholder="Subject "
                                                  required=""
                                                  data-error="Please enter your Subject "
                                              />
                                              <div className="help-block with-errors " />
                                          </div>
                                      </div>
                                      <div className="col-md-12 ">
                                          <div className="form-group ">
                    <textarea
                        className="form-control "
                        id="message "
                        placeholder="Your Message "
                        rows={4}
                        data-error="Write your message "
                        required=""
                        defaultValue={""}
                    />
                                              <div className="help-block with-errors " />
                                          </div>
                                          <div className="submit-button text-center ">
                                              <button
                                                  className="btn hvr-hover "
                                                  id="submit "
                                                  type="submit "
                                              >
                                                  Send Message
                                              </button>
                                              <div id="msgSubmit " className="h3 text-center hidden " />
                                              <div className="clearfix " />
                                          </div>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/* End Cart */}
          <Footer></Footer>
      </>
  )
}
export default Contact;