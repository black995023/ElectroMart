import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
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
    return (
      <div class="body-login">
        <div className="align-center form-container">
          <h2 className="text-center title">SIGN-UP</h2>
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
                  <td>
                    <label className='labelInput'>
                      <i className='icon name'></i>
                      <input type="text" className='inputLogin' placeholder='Name' value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='labelInput'>
                      <i className='icon phone'></i>
                      <input type="tel" className='inputLogin' placeholder='Phone' value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='labelInput'>
                      <i className='icon email'></i>
                      <input type="email" className='inputLogin' placeholder='Email' value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><input type="submit" className='btnLogin' value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;