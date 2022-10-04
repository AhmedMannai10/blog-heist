import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import Button from "../components/Button";

export default function Home() {
    return (
        <div className="md:px-10 flex flex-col">
            <Link
                href={{
                    pathname: "/[username]",
                    query: { username: "Ahmed" },
                }}
            >
                <a>Ahmed Profile</a>
            </Link>

            <button
                className="bg-black px-1 text-bold text-white w-24 text-xl rounded-md"
                onClick={() => {
                    toast.success("Toasted Well", {
                        position: "buttom-center",
                    });
                }}
            >
                Toast Me
            </button>
            <Loader show />
        </div>
    );
}
