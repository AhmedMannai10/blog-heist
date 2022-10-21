import React from "react";
import Link from "next/link";

const Custom404 = () => {
    return (
        <main>
            <h1>404 That page Not found ..</h1>
            <iframe
                src="https://giphy.com/embed/SDUiharA58JhGCwDqP"
                width="480"
                height="480"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
            ></iframe>
            <p>
                <a href="https://giphy.com/gifs/error-404-freshcake-SDUiharA58JhGCwDqP">
                    via GIPHY
                </a>
            </p>

            <Link href="/">
                <button className="bg-blue-600 text-white rounded-lg px-4 py-2">
                    Go Home
                </button>
            </Link>
        </main>
    );
};

export default Custom404;
