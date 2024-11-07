const Footer = () => {
  return (
    <footer>
      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="footer-widget">
                <h4>About Book Hub</h4>
                <p>
                  When it comes to searching for books, there is only one place
                  to turn to – Book Hub.We have a veritable collection of books
                  that span categories as diverse as you could possibly expect.
                  From segments like accountancy, to parenting and pregnancy, to
                  banking and finance, to even topics on yoga and meditation –
                  almost any category you seek – you will find with us
                </p>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-rss" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-pinterest-p" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-whatsapp" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="footer-link">
                <h4>Information</h4>
                <ul>
                  <li>
                    <a href="#">Details</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="footer-link-contact">
                <h4>Contact Us</h4>
                <ul>
                  <li>
                    <p>
                      <i className="fas fa-map-marker-alt" />
                      Address: Da Nang
                      <br />
                      Viet Nam <br />{" "}
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-phone-square" />
                      Phone: <a href="tel:0386106329">0386106329</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-envelope" />
                      Email:{" "}
                      <a href="mailto:contactinfo@gmail.com">
                        bookhub@gmail.com
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
