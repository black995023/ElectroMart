import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
      showCategories: false,
      showGmap: false,
      isMobileView: false
    };
  }

  componentDidMount() {
    this.apiGetCategories();
    this.checkMobileView();
    window.addEventListener('resize', this.checkMobileView);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkMobileView);
  }

  checkMobileView = () => {
    const isMobileView = window.innerWidth <= 768;
    this.setState({ isMobileView });
  };

  render() {
    const { categories, txtKeyword, showCategories, showGmap, isMobileView } = this.state;

    const cates = categories
      .filter(item => ['iPad', 'iPhone', 'Laptop', 'Macbook'].includes(item.name))
      .map(item => (
        <li key={item._id} className="menu">
          <Link to={'/product/category/' + item._id}>
            {item.name === 'iPad' ? (
              <span>
                {item.name} <i className="fa-solid fa-tablet-screen-button"></i>
              </span>
            ) : item.name === 'iPhone' ? (
              <span>
                {item.name} <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
            ) : item.name === 'Laptop' ? (
              <span>
                {item.name} <i className="fa-solid fa-laptop"></i>
              </span>
            ) : item.name === 'Macbook' ? (
              <span>
                {item.name} <i className="fa-brands fa-apple"></i>
              </span>
            ) : (
              ""
            )}
          </Link>
        </li>
      ));

    return (
      <div className="navbar w-100">
        <div className="navbar-left w-100 d-flex">
          <ul className="menu w-100">
            <li className="menu mt-3">
              <Link to="/home" className='box-title'>
                <i className="icon fire"></i>
                <p className="title_logo">Electro Mart</p>
              </Link>
            </li>
            <ul className='box-list mt-3'>
              <ul className='list-item'>
                {!isMobileView && cates} {/* Hiển thị categories nếu không phải màn hình điện thoại */}
                {isMobileView && ( // Kiểm tra nếu là màn hình điện thoại, thì chỉ hiển thị toggle button
                  <li className="menu menu-content">
                    <button className="toggle-btn" onClick={this.toggleCategories}>
                      <i className="fas fa-bars"></i> {/* Sử dụng Font Awesome icon */}
                    </button>
                  </li>
                )}
                <div className="list-icon">
                  {showCategories && isMobileView && cates} {/* Hiển thị categories nếu showCategories là true và là màn hình điện thoại */}
                  {!isMobileView && (
                    <li className="menu">
                      <Link to='/gmap'>Gmap
                        <i className="fa-solid fa-map"></i>
                      </Link>
                    </li>
                  )}
                </div>
              </ul>
            </ul>
          </ul>
        </div>
        <div style={{ display: "inline" }} className="form-switch">
          <input className="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp; Light / Dark mode
        </div>
        <div className="navbar-right pad1">
          <form className="search" onSubmit={(e) => this.btnSearchClick(e)}>
            <input
              type="search"
              placeholder="Enter keyword"
              className="keyword"
              value={txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
            />
            <button type="submit" className="search-btn">
              SEARCH
            </button>
          </form>
        </div>
      </div>
    );
  }

  toggleCategories = () => {
    this.setState(prevState => ({
      showCategories: !prevState.showCategories,
      showGmap: !prevState.showGmap
    }));
  };

  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  btnSearchClick(e) {
    e.preventDefault();
    const { txtKeyword } = this.state;

    if (txtKeyword.trim() !== '') {
      this.props.navigate('/product/search/' + txtKeyword);
    }
  }
}

export default withRouter(Menu);
