// utils/Providers.js
"use client";

import { Provider } from "react-redux";
import store from "../utils/appStore"; // adjust if your store is elsewhere

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
