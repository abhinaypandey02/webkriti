import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from "./contexts/user_context";
import SocietiesContext from "./contexts/societies_context";
import ThemeContext from "./contexts/theme_context";

ReactDOM.render(
  <React.StrictMode>
      <UserContext>
          <SocietiesContext>
              <ThemeContext>
                  <App />

              </ThemeContext>
          </SocietiesContext>
      </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
