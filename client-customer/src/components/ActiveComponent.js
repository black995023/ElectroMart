import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="body-login">
        <div className="align-center form-container">
          <h2 className="text-center title">ACTIVE ACCOUNT</h2>
          <form className="form-login">
            <table className="">
              <tbody>
                <tr>
                  <td>
                    <label className="labelInput">
                      <i className="icon username"></i>
                      <input
                        className="inputLogin"
                        placeholder="ID"
                        type="text"
                        value={this.state.txtID}
                        onChange={(e) => {
                          this.setState({ txtID: e.target.value });
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
                        placeholder="Token"
                        type="text"
                        value={this.state.txtToken}
                        onChange={(e) => {
                          this.setState({ txtToken: e.target.value });
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
                      value="ACTIVE"
                      onClick={(e) => this.btnActiveClick(e)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('You have successfully activated your account.');
      } else {
        alert('Sorry, there was an issue with your activation request. Please try again later.');
      }
    });
  }

}
export default Active;