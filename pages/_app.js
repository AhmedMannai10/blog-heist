import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <UserContext.Provider value={{ user:{}, username: "Ahmed"}}>
                <Navbar />
                <div className=" md:px-32 px-10">
                    <Component {...pageProps} />
                </div>
                <Toaster />
            </UserContext.Provider>
        </>
    );
}

export default MyApp;
