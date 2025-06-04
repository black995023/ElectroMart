import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
    };
  }
  render() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (this.context.token === "") {
      return (
        <div className="body-login">
          <div className="align-valign-center">
              <h2 className="text-center">ADMIN LOGIN</h2>
              <form className="form-login">
                <table className="">
                  <tbody>
                    <tr>
                      <td>
                        <label className="labelLogin" htmlFor="txtUsername">
                          <i className='icon username'></i>
                        <input
                          type="text" className="inputLogin"
                          id="txtUsername"
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
                          <label className="labelLogin" htmlFor="txtPassword">
                            <i className='icon password'></i>
                            <input className="inputLogin"
                            type="password"
                            id="txtPassword"
                            value={this.state.txtPassword}
                            onChange={(e) => {
                              this.setState({ txtPassword: e.target.value });
                            }}
                          />
                          </label>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input className="btnLogin"
                          type="submit"
                          value="LOGIN"
                          onClick={(e) => this.btnLoginClick(e)}
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
  
    // Nếu đã đăng nhập, trả về một div trống để không có gì được hiển thị
    return <div />;
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
      alert("Please input username and password");
    }
  }
  // apis
  apiLogin(account) {
    axios.post("/api/admin/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;
