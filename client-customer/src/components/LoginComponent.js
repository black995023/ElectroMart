import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'sonkk',
      txtPassword: '123'
    };
  }
  render() {
    return (
      <div className="body-login">
        <div className="align-center form-container">
          <h3 className="text-center">CUSTOMER LOGIN</h3>
          <form className='form-login'>
            <table className="">
              <tbody>
                <tr>
                  <td>
                    <label className='labelInput'>
                      <i className='icon username'></i>
                      <input className='inputLogin' placeholder='Username' type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='labelInput'>
                      <i className='icon password'></i>
                      <input className='inputLogin' placeholder='Password' type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><input className='btnLogin' type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>

    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);