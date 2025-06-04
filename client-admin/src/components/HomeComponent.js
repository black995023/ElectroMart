import React, { Component } from "react";
import "../Home.css"; // Tạo một file Home.css để đặt các quy tắc CSS

class Home extends Component {
  render() {
    return (
      <div className="home-container pad1">
        <div className="home-header">
          <h2 className="text-center">Welcome to Admin Home</h2>
        </div>
        <div className="home-content">
          <img
            src="https://usagif.com/wp-content/uploads/2021/4fh5wi/welcome-15.gif"
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Home;
