// utils/Providers.js
"use client";

import { Provider } from "react-redux";
import appStore from "../utils/appStore"; // adjust if your store is elsewhere

const Providers = ({ children }) => {
  return <Provider store={appStore}>{children}</Provider>;
};

export default Providers;
