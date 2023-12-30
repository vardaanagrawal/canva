import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import {GoogleOAuthProvider} from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={`935328519410-r1fteedhjia91adkoagjjqb5q4sdvh8k.apps.googleusercontent.com`}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
