import { Provider } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import { ToastContainer } from "react-toastify";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Navbar />

          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
