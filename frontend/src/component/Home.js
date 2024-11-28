import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header></Header>
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
      {/* Start Slider */}
      <div id="slides-shop" className="cover-slides">
        <ul className="slides-container">
          <li className="text-left">
            <img src="images/img2.jpg" alt="" />
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="m-b-20">
                    <strong>
                      Welcome To <br /> Book Hub
                    </strong>
                  </h1>
                  <p className="m-b-40">
                    When it comes to searching for books, there is only one
                    place to turn to – Book Hub.
                  </p>
                  <p>
                    <a className="btn hvr-hover" href="/product">
                      Store
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="text-center">
            <img src="images/img3.jpg" alt="" />
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="m-b-20">
                    <strong>
                      Login with <br /> your account
                    </strong>
                  </h1>
                  <p className="m-b-40">
                    Already have an acocunt ? login with the button below
                  </p>
                  <p>
                    <a className="btn hvr-hover" href="/login">
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="text-right">
            <img src="images/img1.webp" alt="" />
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="m-b-20">
                    <strong>
                      Contact Us <br /> Via below!
                    </strong>
                  </h1>
                  <p className="m-b-40">
                    Have some questions or problems you want to contact us? Check below
                  </p>
                  <p>
                    <a className="btn hvr-hover" href="/contact">
                      Contact Us
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className="slides-navigation">
          <a href="#" className="next">
            <i className="fa fa-angle-right" aria-hidden="true" />
          </a>
          <a href="#" className="prev">
            <i className="fa fa-angle-left" aria-hidden="true" />
          </a>
        </div>
      </div>
      {/* End Slider */}
      {/* Start Categories  */}
      <div className="categories-shop">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="shop-cat-box">
                <img
                  className="img-fluid"
                  src="images/action and advencture.jpg"
                  width="352px"
                  length="352px"
                  alt=""
                />
                <a className="btn hvr-hover" href="/product">
                  Action and Adventure
                </a>
              </div>
              <div className="shop-cat-box">
                <img className="img-fluid" src="images/Classics.png" alt="" />
                <a className="btn hvr-hover" href="/product">
                  Classics
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="shop-cat-box">
                <img
                  className="img-fluid"
                  src="images/Historical_fiction.jpg"
                  alt=""
                />
                <a className="btn hvr-hover" href="/product">
                  Historical Fiction
                </a>
              </div>
              <div className="shop-cat-box">
                <img className="img-fluid" src="images/Litrature.jpg" alt="" />
                <a className="btn hvr-hover" href="/product">
                  Literary Fiction
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="shop-cat-box">
                <img
                  className="img-fluid"
                  src="images/Science_fictiom.jpg"
                  alt=""
                />
                <a className="btn hvr-hover" href="/product">
                  Science Fiction
                </a>
              </div>
              <div className="shop-cat-box">
                <img className="img-fluid" src="images/Biography.jpg" alt="" />
                <a className="btn hvr-hover" href="/product">
                  Biography
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Categories */}

      <Footer></Footer>
    </>
  );
};
export default Home;
