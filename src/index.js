import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "../src/Store/AuthContext";
import { PreferenceProvider } from "../src/Store/PreferenceContext";
import { ChildProvider } from "../src/Store/ChildContext"

ReactDOM.render(
  <React.StrictMode>
    <PreferenceProvider>
      <AuthProvider>
        <ChildProvider>
          <App />
        </ChildProvider>
      </AuthProvider>
    </PreferenceProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
