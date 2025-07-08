"use client";

import { Provider } from "react-redux";
import appStore from "../utils/appStore"; 

const Providers = ({ children }) => {
  return <Provider store={appStore}>{children}</Provider>;
};

export default Providers;
