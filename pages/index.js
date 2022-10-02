import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <div className="md:px-40">
            <Link
                href={{
                    pathname: "/[username]",
                    query: { username: "Ahmed" },
                }}
            >
                <a>Ahmed Profile</a>
            </Link>
        </div>
    );
}
