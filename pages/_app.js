import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <div className=" md:px-32 px-10">
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;
