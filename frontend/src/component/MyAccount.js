import Footer from "./Footer";
import Header from "./Header";

const MyAccount = () => {
  return(
      <>
          <Header></Header>
          {/* Start Top Search */}
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
          {/* End Top Search */}
          {/* Start All Title Box */}
          <div className="all-title-box">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-12">
                          <h2>My Account</h2>
                          <ul className="breadcrumb">
                              <li className="breadcrumb-item">
                                  <a href="#">Shop</a>
                              </li>
                              <li className="breadcrumb-item active">My Account</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
          {/* End All Title Box */}
          {/* Start My Account  */}
          <div className="my-account-box-main">
              <div className="container">
                  <div className="my-account-page">
                      <div className="row">
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="#">
                                              {" "}
                                              <i className="fa fa-gift" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Your Orders</h4>
                                          <p>Track, return, or buy things again</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="#">
                                              <i className="fa fa-lock" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Login &amp; security</h4>
                                          <p>Edit login, name, and mobile number</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="#">
                                              {" "}
                                              <i className="fa fa-location-arrow" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Your Addresses</h4>
                                          <p>Edit addresses for orders and gifts</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="#">
                                              {" "}
                                              <i className="fa fa-credit-card" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Payment options</h4>
                                          <p>Edit or add payment methods</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="#">
                                              {" "}
                                              <i className="fab fa-paypal" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>PayPal</h4>
                                          <p>View benefits and payment settings</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="#">
                                              {" "}
                                              <i className="fab fa-amazon" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Amazon Pay balance</h4>
                                          <p>Add money to your balance</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/* End My Account */}
          <Footer></Footer>
      </>

  )
}
export default MyAccount;