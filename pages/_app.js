import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <div className=" md:px-32 px-10">
                <Component {...pageProps} />
            </div>
            <Toaster />
        </>
    );
}

export default MyApp;
