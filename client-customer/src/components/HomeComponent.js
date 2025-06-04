import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      bestprods: [],
      categories: [],
      activeIndex: 0,
    };
  }

  handleSelect = (selectedIndex) => {
    this.setState({ activeIndex: selectedIndex });
  };

  renderProducts(products) {
    return products.map((item) => (
      <div key={item._id} className="product-item">
        <figure>
          <Link to={`/product/${item._id}`}>
            <img
              src={`data:image/jpg;base64,${item.image}`}
              width="300px"
              height="300px"
              alt={item.name}
            />
          </Link>
          <div className="column">
            <span>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </span>
            <figcaption className="text-center">
              {item.name}
              <br />
              Price: {item.price}
            </figcaption>
          </div>
        </figure>
      </div>
    ));
  }

  // renderCarouselIndicators() {
  //   return [0, 1, 2].map(index => (
  //     <li
  //       key={index}
  //       data-target="#carouselExampleIndicators"
  //       data-slide-to={index}
  //       className={index === this.state.activeIndex ? 'active' : ''}
  //       onClick={() => this.handleCarouselIndicatorClick(index)}
  //     ></li>
  //   ));
  // }

  // renderCarouselItems() {
  //   const carouselItems = [
  //     { src: 'https://www.patternb.com/wp-content/uploads/2019/10/big-banner-iphone-11-accessories.jpg', alt: 'First slide' },
  //     { src: 'https://i.pinimg.com/originals/94/99/ef/9499ef4235609a75d4a99f4b55213afa.png', alt: 'Second slide' },
  //     { src: 'https://file.hstatic.net/1000347078/collection/banner_macbook_92054b106e2d457f9391d59825973023.jpg', alt: 'Third slide' },
  //   ];

  //   return carouselItems.map((item, index) => (
  //     <div key={index} className={`carousel-item ${index === this.state.activeIndex ? 'active' : ''}`}>
  //       <img className="img-carousel d-block w-100" src={item.src} alt={item.alt} />
  //     </div>
  //   ));
  // }

  // handleCarouselIndicatorClick = (index) => {
  //   this.setState({ activeIndex: index });
  //   $('#carouselExampleIndicators').carousel(index);
  // }
  
  handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    const { newprods, hotprods, bestprods, activeIndex } = this.state;
    const cates = this.state.categories.map((item) => (
      <li key={item._id} className="menu">
        <Link to={"/product/category/" + item._id}>
          {item.name === "iPad" ? (
            <span>
              {item.name} <i className="fa-solid fa-tablet-screen-button"></i>
            </span>
          ) : item.name === "iPhone" ? (
            <span>
              {item.name} <i className="fa-solid fa-mobile-screen-button"></i>
            </span>
          ) : item.name === "Laptop" ? (
            <span>
              {item.name} <i className="fa-solid fa-laptop"></i>
            </span>
          ) : item.name === "Macbook" ? (
            <span>
              {item.name} <i className="fa-brands fa-apple"></i>
            </span>
          ) : item.name === "Gift Card" ? (
            <span>
              {item.name} <i class="fa-solid fa-gift"></i>
            </span>
          ) : item.name === "Console" ? (
            <span>
              {item.name} <i class="fa-brands fa-playstation"></i>
            </span>
          ) : item.name === "Camera & Photo" ? (
            <span>
              {item.name} <i class="fa-solid fa-camera-retro"></i>
            </span>
          ) : item.name === "Headphone" ? (
            <span>
              {item.name} <i class="fa-solid fa-headphones"></i>
            </span>
          ) : item.name === "Monitors" ? (
            <span>
              {item.name} <i class="fa-solid fa-desktop"></i>
            </span>
          ) : (
            item.name
          )}
        </Link>
      </li>
    ));

    return (
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className={activeIndex === 0 ? "active" : ""}
              aria-current={activeIndex === 0 ? "true" : ""}
              aria-label="Slide 1"
              onClick={() => this.handleSelect(0)}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              className={activeIndex === 1 ? "active" : ""}
              aria-current={activeIndex === 1 ? "true" : ""}
              aria-label="Slide 2"
              onClick={() => this.handleSelect(1)}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              className={activeIndex === 2 ? "active" : ""}
              aria-current={activeIndex === 2 ? "true" : ""}
              aria-label="Slide 3"
              onClick={() => this.handleSelect(2)}
            ></button>
          </div>
          <div className="carousel-inner" data-aos="fade-up">
            <div
              className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}
            >
              <img
                src="https://www.patternb.com/wp-content/uploads/2019/10/big-banner-iphone-11-accessories.jpg"
                className="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div
              className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}
            >
              <img
                src="https://i.pinimg.com/originals/94/99/ef/9499ef4235609a75d4a99f4b55213afa.png"
                className="d-block w-100"
                alt="Slide 2"
              />
            </div>
            <div
              className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}
            >
              <img
                src="https://file.hstatic.net/1000347078/collection/banner_macbook_92054b106e2d457f9391d59825973023.jpg"
                className="d-block w-100"
                alt="Slide 3"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
            onClick={() => this.handleSelect((activeIndex - 1 + 3) % 3)}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
            onClick={() => this.handleSelect((activeIndex + 1) % 3)}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container mt-4">
          <div className="product-section align-center">
            <h2 className="text-center background-h2">NEW PRODUCTS</h2>
            <div className="product-list">{this.renderProducts(newprods)}</div>
          </div>

          {hotprods.length > 0 && (
            <div className="product-section align-center">
              <h2 className="text-center background-h2">HOT PRODUCTS</h2>
              <div className="product-list">
                {this.renderProducts(hotprods)}
              </div>
            </div>
          )}

          {bestprods.length > 0 && (
            <div className="product-section align-center">
              <h2 className="text-center background-h2">BEST SELLER</h2>
              <div className="product-list">
                {this.renderProducts(bestprods)}
              </div>
            </div>
          )}
          <hr></hr>
          <div id="list-categories" className="list-categories mb-4">
            <ul className="menu">{cates}</ul>
          </div>
          <hr></hr>
          <div className="services mt-4 mb-4">
            <h2 className="text-center background-h2 mb-4">OUR SERVICES</h2>
            <ul className="align-center list-services">
              <li>
                Fast Delivery <i class="fa-solid fa-truck-fast"></i>
              </li>
              <li>
                Quality Products <i class="fa-solid fa-medal"></i>
              </li>
              <li>
                24/7 Customer Support <i class="fa-solid fa-phone"></i>
              </li>
              {/* Thêm các dòng khác tương tự */}
            </ul>
          </div>
          <div className="customer-reviews">
            <h3 className="text-center background-h2">CUSTOMER REVIEWS</h3>
            <div className="customers row">
              <div className="customer-item col-12 col-sm-6 col-md-4 text-center">
                <img
                  src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg"
                  width="200px"
                  height="200px"
                  alt=""
                />
                <p className="customer-name">Alisa</p>
                <span>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </span>
                <p>
                  Excellent service! The delivery was quick and the product
                  quality exceeded my expectations.
                </p>
              </div>
              <div className="customer-item col-12 col-sm-6 col-md-4 text-center">
                <img
                  src="https://img.freepik.com/premium-photo/cartoon-character-woman-with-green-eyes-black-shirt_745528-26863.jpg"
                  width="200px"
                  height="200px"
                  alt=""
                />
                <p className="customer-name">Reberica</p>
                <span>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </span>
                <p>
                  Highly recommend this store. The products are top-notch, and
                  the customer support is always helpful.
                </p>
              </div>
              <div className="customer-item col-12 col-sm-6 col-md-4 text-center">
                <img
                  src="https://img.freepik.com/premium-photo/memoji-beautiful-girl-woman-white-background-emoji_826801-6867.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais"
                  width="200px"
                  height="200px"
                  alt=""
                />
                <p className="customer-name">Tailor</p>
                <span>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </span>
                <p>
                  Absolutely recommend this store. The products are of
                  exceptional quality, and the customer support is consistently
                  helpful.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-lg-start bg-body-tertiary text-muted">
            {/* Section: Social media */}
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              {/* Left */}
              <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
              </div>
              {/* Left */}
              {/* Right */}
              <div>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="me-4 text-reset">
                  <i className="fab fa-github"></i>
                </a>
              </div>
              {/* Right */}
            </section>
            {/* Section: Social media */}
            {/* Section: Links */}
            <section className="">
              <div className="text-center text-md-start mt-5">
                {/* Grid row */}
                <div className="row mt-3">
                  {/* Grid column */}
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    {/* Content */}
                    <h6 className="text-uppercase fw-bold mb-4">
                      <i class="fa-solid fa-building"></i> ELECTRO MART
                    </h6>
                    <p>
                      Electro Mart is a premier online shopping destination,
                      offering a modern and convenient experience for technology
                      and entertainment enthusiasts. We take pride in our
                      diverse range of products from leading global brands,
                      ensuring top-notch quality and excellent customer service.
                      Explore the world of cutting-edge technology and
                      entertainment at Electro Mart today!
                    </p>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                    <p>
                      <a href="#!" className="text-reset">
                        MongoDb
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Express
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        ReactJs
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        NodeJs
                      </a>
                    </p>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold mb-4">
                      Useful links
                    </h6>
                    <p>
                      <a href="#!" className="text-reset">
                        IPad
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Iphone
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Macbook
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Laptop
                      </a>
                    </p>
                  </div>
                  {/* Grid column */}
                  {/* Grid column */}
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                    <p>
                      <i className="fas fa-home me-3"></i> New York, NY 10012,
                      US
                    </p>
                    <p>
                      <i className="fas fa-envelope me-3"></i>
                      info@example.com
                    </p>
                    <p>
                      <i className="fas fa-phone me-3"></i> + 01 234 567 88
                    </p>
                    <p>
                      <i className="fas fa-print me-3"></i> + 01 234 567 89
                    </p>
                  </div>
                  {/* Grid column */}
                </div>
                {/* Grid row */}
              </div>
            </section>
            {/* Section: Links */}
            {/* Copyright */}
            <div
              className="text-center p-4"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
              <span m-2>© 2021 Copyright by: </span>
              <a className="text-reset fw-bold" href="#">
                {" "}
                Khải-Lâm-Hiền-Thanh
              </a>
            </div>
            {/* Copyright */}
          </footer>
          {/* Footer */}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    this.apiGetBestProducts();
    this.apiGetCategories();
    this.initCarousel();
    AOS.init({
      duration: 2000, // thời gian hiệu ứng
    });
  }

  componentDidUpdate() {
    this.initCarousel();
  }

  initCarousel() {
    window.$(".carousel").carousel();
  }

  apiGetNewProducts() {
    axios.get("/api/customer/products/new").then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get("/api/customer/products/hot").then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

  apiGetBestProducts() {
    axios.get("/api/customer/products/best").then((res) => {
      const result = res.data;
      this.setState({ bestprods: result });
    });
  }

  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Home;
