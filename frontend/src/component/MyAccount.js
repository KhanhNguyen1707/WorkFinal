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
                                          <a href="/orderhistory">
                                              {" "}
                                              <i className="fa fa-gift" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Your Orders</h4>
                                          <p>Track your order history</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="/password/edit">
                                              <i className="fa fa-lock" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Change password</h4>
                                          <p>Change your accounnt password</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                              <div className="account-box">
                                  <div className="service-box">
                                      <div className="service-icon">
                                          <a href="/profile/edit">
                                              {" "}
                                              <i className="fa fa-location-arrow" />{" "}
                                          </a>
                                      </div>
                                      <div className="service-desc">
                                          <h4>Your Profile</h4>
                                          <p>Edit your profile</p>
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