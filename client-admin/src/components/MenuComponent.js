import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
    <div className="navbar">
      <div className="navbar-left">
        <ul className="menu">
          <li className="menu">
          <Link to="/admin/home">
            <i className="icon fire"></i>
              <p className="title_logo">Electro Mart</p>
          </Link>
          </li>
          <li className="menu"> 
            <Link to="/admin/home">Home</Link>
          </li>
          <li className="menu">
            <Link to="/admin/category">Category</Link>
          </li>
          <li className="menu">
            <Link to="/admin/product">Product</Link>
          </li>
          <li className="menu">
            <Link to="/admin/order">Order</Link>
          </li>
          <li className="menu">
            <Link to="/admin/customer">Customer</Link>
          </li>
          <li className="menu">
            <Link to="/admin/revenue">Statistic</Link>
          </li>
        </ul>
      </div>
      <div style={{ display: "inline" }} class="form-switch">
        <input class="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp; Light / Dark mode
      </div>
      <div className="navbar-right pad1">
        Hello <b>{this.context.username}</b> |
        <Link to="/admin/home" onClick={() => this.lnkLogoutClick()}>
          Logout
        </Link>
      </div>
    </div>
    );
  }
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}
export default Menu;
