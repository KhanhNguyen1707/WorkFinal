import Footer from "./Footer";
import Header from "./Header";

const AdminHome = () => {
  return (
    <>
      <Header />

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
              <h2>Admin Dashboard</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Admin</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}

      {/* Start Admin Dashboard */}
      <div className="admin-dashboard-box-main">
        <div className="container">
          <div className="admin-dashboard-page">
            <div className="row">
              {/* Manage Orders */}
              <div className="col-lg-4 col-md-12">
                <div className="account-box">
                  <div className="service-box">
                    <div className="service-icon">
                      <a href="/manageorder">
                        <i className="fa fa-shopping-cart" />
                      </a>
                    </div>
                    <div className="service-desc">
                      <h4>Manage Orders</h4>
                      <p>View and manage customer orders</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manage Books */}
              <div className="col-lg-4 col-md-12">
                <div className="account-box">
                  <div className="service-box">
                    <div className="service-icon">
                      <a href="/managebook">
                        <i className="fa fa-book" />
                      </a>
                    </div>
                    <div className="service-desc">
                      <h4>Manage Books</h4>
                      <p>Add, update, or delete books</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manage Users */}
              <div className="col-lg-4 col-md-12">
                <div className="account-box">
                  <div className="service-box">
                    <div className="service-icon">
                      <a href="/manageuser">
                        <i className="fa fa-users" />
                      </a>
                    </div>
                    <div className="service-desc">
                      <h4>Manage Users</h4>
                      <p>View and edit user accounts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manage Authors */}
              <div className="col-lg-4 col-md-12">
                <div className="account-box">
                  <div className="service-box">
                    <div className="service-icon">
                      <a href="/manageauthor">
                        <i className="fa fa-pencil-alt" />
                      </a>
                    </div>
                    <div className="service-desc">
                      <h4>Manage Authors</h4>
                      <p>Add, update, or delete authors</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manage Genres */}
              <div className="col-lg-4 col-md-12">
                <div className="account-box">
                  <div className="service-box">
                    <div className="service-icon">
                      <a href="/managegenre">
                        <i className="fa fa-tags" />
                      </a>
                    </div>
                    <div className="service-desc">
                      <h4>Manage Genres</h4>
                      <p>Add or edit genres for books</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Admin Dashboard */}

      <Footer />
    </>
  );
};

export default AdminHome;
