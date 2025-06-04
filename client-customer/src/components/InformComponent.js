import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === '' ?
            <div className='box-nav'>
              <div class="link-nav">
                <Link className="nav-links" to='/login'>Login</Link>
                <Link className="nav-links" to='/signup'>Sign-up</Link>
                <Link className="nav-links" to='/active'>Active</Link>
              </div>
            </div>
            :
            <div className="logged-in-links">
              <span className="nav-greeting">Hello <b>{this.context.customer.name}</b></span>
              <Link className="nav-links" to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
              <Link className="nav-links" to='/myprofile'>My profile</Link>
              <Link className="nav-links" to='/myorders'>My orders</Link>
            </div>
          }
        </div>
        <div className="float-right">
          <Link className="mycart-link" to='/mycart'>My cart</Link>
          <span className="cart-info">have <b>{this.context.mycart.length}</b> items</span>
        </div>
      </div>

    );
  }
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;