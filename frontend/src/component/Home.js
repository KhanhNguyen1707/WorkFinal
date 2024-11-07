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
                      Shop New
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
                      Welcome To <br /> Book Hub
                    </strong>
                  </h1>
                  <p className="m-b-40">
                    When it comes to searching for books, there is only one
                    place to turn to – Book Hub.
                  </p>
                  <p>
                    <a className="btn hvr-hover" href="/product">
                      Shop New
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
                      Welcome To <br /> Book Hub
                    </strong>
                  </h1>
                  <p className="m-b-40">
                    When it comes to searching for books, there is only one
                    place to turn to – Book Hub.
                  </p>
                  <p>
                    <a className="btn hvr-hover" href="/product">
                      Shop New
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
                <a className="btn hvr-hover" href="#">
                  Action and Adventure
                </a>
              </div>
              <div className="shop-cat-box">
                <img className="img-fluid" src="images/Classics.png" alt="" />
                <a className="btn hvr-hover" href="#">
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
                <a className="btn hvr-hover" href="#">
                  Historical Fiction
                </a>
              </div>
              <div className="shop-cat-box">
                <img className="img-fluid" src="images/Litrature.jpg" alt="" />
                <a className="btn hvr-hover" href="#">
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
                <a className="btn hvr-hover" href="#">
                  Science Fiction
                </a>
              </div>
              <div className="shop-cat-box">
                <img className="img-fluid" src="images/Biography.jpg" alt="" />
                <a className="btn hvr-hover" href="#">
                  Biography
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Categories */}
      {/* Start Products  */}
      <div className="products-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-all text-center">
                <h1>Featured Products</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sit amet lacus enim.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="special-menu text-center">
                <div className="button-group filter-button-group">
                  <button className="active" data-filter="*">
                    All
                  </button>
                  <button data-filter=".top-featured">Top featured</button>
                  <button data-filter=".best-seller">Best seller</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row special-list">
            <div className="col-lg-3 col-md-6 special-grid best-seller">
              <div className="products-single fix">
                <div className="box-img-hover">
                  <div className="type-lb">
                    <p className="sale">Sale</p>
                  </div>
                  <img
                    src="images/Zero-To-One-by-Peter-Thiel-400x600.jpg"
                    className="img-fluid"
                    alt="Image"
                  />
                  <div className="mask-icon">
                    <ul>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="View"
                        >
                          <i className="fas fa-eye" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Compare"
                        >
                          <i className="fas fa-sync-alt" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Add to Wishlist"
                        >
                          <i className="far fa-heart" />
                        </a>
                      </li>
                    </ul>
                    <a className="cart" href="#">
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="why-text">
                  <h4>Zero to One</h4>
                  <h5> 160</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 special-grid top-featured">
              <div className="products-single fix">
                <div className="box-img-hover">
                  <div className="type-lb">
                    <p className="new">New</p>
                  </div>
                  <img
                    src="images/Alchemist.png"
                    className="img-fluid"
                    alt="Image"
                  />
                  <div className="mask-icon">
                    <ul>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="View"
                        >
                          <i className="fas fa-eye" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Compare"
                        >
                          <i className="fas fa-sync-alt" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Add to Wishlist"
                        >
                          <i className="far fa-heart" />
                        </a>
                      </li>
                    </ul>
                    <a className="cart" href="#">
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="why-text">
                  <h4>Alchemist</h4>
                  <h5> 160</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 special-grid top-featured">
              <div className="products-single fix">
                <div className="box-img-hover">
                  <div className="type-lb">
                    <p className="sale">Sale</p>
                  </div>
                  <img
                    src="images/The_Intelligent_invester.jpg"
                    className="img-fluid"
                    alt="Image"
                  />
                  <div className="mask-icon">
                    <ul>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="View"
                        >
                          <i className="fas fa-eye" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Compare"
                        >
                          <i className="fas fa-sync-alt" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Add to Wishlist"
                        >
                          <i className="far fa-heart" />
                        </a>
                      </li>
                    </ul>
                    <a className="cart" href="#">
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="why-text">
                  <h4>The Intelligent Invester</h4>
                  <h5> 249</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 special-grid best-seller">
              <div className="products-single fix">
                <div className="box-img-hover">
                  <div className="type-lb">
                    <p className="sale">Sale</p>
                  </div>
                  <img
                    src="images/sherlock.jpg"
                    className="img-fluid"
                    alt="Image"
                  />
                  <div className="mask-icon">
                    <ul>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="View"
                        >
                          <i className="fas fa-eye" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Compare"
                        >
                          <i className="fas fa-sync-alt" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          data-placement="right"
                          title="Add to Wishlist"
                        >
                          <i className="far fa-heart" />
                        </a>
                      </li>
                    </ul>
                    <a className="cart" href="#">
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="why-text">
                  <h4>Sherlock Homes</h4>
                  <h5> 299</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Products  */}
      {/* Start Blog  */}
      <div className="latest-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-all text-center">
                <h1>Latest blog</h1>
                <p>
                  <strong>
                    “A room without books is like a body without a soul.” –
                    Cicero
                  </strong>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="blog-box">
                <div className="blog-img">
                  <img className="img-fluid" src="images/bo.webp" alt="" />
                </div>
                <div className="blog-content">
                  <div className="title-blog">
                    <h3>A Promised Land by Barack Obama</h3>
                    <p>
                      A Promised Land’ is the first of two volumes of Barack
                      Obama’s memoirs of his two-term presidency. Published in
                      November last year, this part covers his path to becoming
                      the Democrat candidate in 2008 and then rattles through
                      the main challenges he faced during the first
                      two-and-a-half years of his presidency including the
                      financial crisis, military operations in Afghanistan and
                      Iraq, healthcare reform, climate change, the Deepwater
                      Horizon oil spill, the Arab Spring and the raid that
                      killed Osama bin Laden
                    </p>
                  </div>
                  <ul className="option-blog">
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Likes"
                      >
                        <i className="far fa-heart" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Views"
                      >
                        <i className="fas fa-eye" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Comments"
                      >
                        <i className="far fa-comments" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="blog-box">
                <div className="blog-img">
                  <img className="img-fluid" src="images/three.jpeg" alt="" />
                </div>
                <div className="blog-content">
                  <div className="title-blog">
                    <h3>Three Books By Indie Publishers</h3>
                    <p>
                      The last ten months or so have been very tough for the
                      publishing industry in general, and particularly
                      challenging for small indie presses who have still
                      succeeded in bringing brilliant new books in to the world
                      during a pandemic no less. One of those is Exit Management
                      by Naomi Booth which was published by Dead Ink Books last
                      summer. Originally from the north of England, Lauren works
                      at a City firm as a graduate HR executive and specialises
                      in “exit management”, otherwise known as firing people in
                      less corporate terms.
                    </p>
                  </div>
                  <ul className="option-blog">
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Likes"
                      >
                        <i className="far fa-heart" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Views"
                      >
                        <i className="fas fa-eye" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Comments"
                      >
                        <i className="far fa-comments" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="blog-box">
                <div className="blog-img">
                  <img className="img-fluid" src="images/ro.webp" alt="" />
                </div>
                <div className="blog-content">
                  <div className="title-blog">
                    <h3>Rodham by Curtis Sittenfeld</h3>
                    <p>
                      I really enjoyed American Wife by Curtis Sittenfeld which
                      is a thinly disguised account of the life of Laura Bush,
                      wife of George W. Bush and former First Lady of the United
                      States. I also enjoyed Sittenfeld’s short story ‘The
                      Nominee’ which is included in the UK edition of You Think
                      It, I’ll Say It and is told from the perspective of
                      Hillary Rodham Clinton a few months before the 2016 US
                      presidential election.
                    </p>
                  </div>
                  <ul className="option-blog">
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Likes"
                      >
                        <i className="far fa-heart" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Views"
                      >
                        <i className="fas fa-eye" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Comments"
                      >
                        <i className="far fa-comments" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* End Blog  */}
      {/* Start Instagram Feed  */}
      <div className="instagram-box">
        <div className="main-instagram owl-carousel owl-theme">
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-01.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-02.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-03.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-04.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-05.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-06.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-07.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-08.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-09.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ins-inner-box">
              <img src="images/instagram-img-05.jpg" alt="" />
              <div className="hov-in">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Home;
