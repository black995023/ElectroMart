import './App.css';
import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from './contexts/MyProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TawkToChat from './components/TawkToChat';
import ScrollToTop from './components/ScrollToTop';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <BrowserRouter >
        <div>
            <Main />
            <ScrollToTop />
            <TawkToChat />
        </div>
        </BrowserRouter>
      </MyProvider>
    );
  }
}
export default App;