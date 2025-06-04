import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="body-login">
      <form className="form-container">
      <h2 className="text-center">MY PROFILE</h2>
        <table className="profile">
          <tbody>
            <tr>
              <td>
                <label className="labelInput">
                  <i className="icon username"></i>
                  <input
                    className="inputLogin"
                    type="text"
                    placeholder="Username"
                    value={this.state.txtUsername}
                    onChange={(e) => {
                      this.setState({ txtUsername: e.target.value });
                    }}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="labelInput">
                  <i className="icon password"></i>
                  <input
                    className="inputLogin"
                    type="password"
                    placeholder="Password"
                    value={this.state.txtPassword}
                    onChange={(e) => {
                      this.setState({ txtPassword: e.target.value });
                    }}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="labelInput">
                  <i className="icon name"></i>
                  <input
                    type="text"
                    className="inputLogin"
                    placeholder="Name"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="labelInput">
                  <i className="icon phone"></i>
                  <input
                    type="tel"
                    className="inputLogin"
                    placeholder="Phone"
                    value={this.state.txtPhone}
                    onChange={(e) => {
                      this.setState({ txtPhone: e.target.value });
                    }}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className="labelInput">
                  <i className="icon email"></i>
                  <input
                    type="email"
                    className="inputLogin"
                    placeholder="Email"
                    value={this.state.txtEmail}
                    onChange={(e) => {
                      this.setState({ txtEmail: e.target.value });
                    }}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  type="submit"
                  className="btnLogin"
                  value="UPDATE"
                  onClick={(e) => this.btnUpdateClick(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setCustomer(result);
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Myprofile;