import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import store from "../src/Store/index";
import ScrollToTop from "./components/scroll-to-top";

import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
// ----------------------------------------------------------------------
// const store = createStore(reducers, compose(applyMiddleware(thunk)));
export default function App() {
  return (
    <Provider store={store}>

        <ThemeProvider>
          <ScrollToTop />
          <Router />
        </ThemeProvider>
        <ToastContainer />

    </Provider>
  );
}
