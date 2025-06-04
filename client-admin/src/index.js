import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

document.addEventListener("DOMContentLoaded", function () {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // The rest of your code...

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.add('remove');
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  const hiddenLeftElements = document.querySelectorAll(".left");
  const hiddenRightElements = document.querySelectorAll(".right");

  hiddenElements.forEach(el => observer.observe(el));
  hiddenLeftElements.forEach((el) => observer.observe(el));
  hiddenRightElements.forEach(el => observer.observe(el));

  // The rest of your code...
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

