import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar() {
    const { user, username } = useContext(UserContext);

    console.log(
        `username : ${username}\n user: ${user}, photo: ${user?.photoURL}`
    );

    return (
        <div className="flex  items-center md:px-40 px-10 h-16 uppercase bg-slate-900 mb-10  ">
            <ul className=" flex flex-1 justify-between items-center">
                <li>
                    <Link href="/">
                        <a>
                            <Button className="bg-slate-900 text-white bold h-10">
                                Feed
                            </Button>
                        </a>
                    </Link>
                </li>
                <li>
                    {username && (
                        <>
                            <ul className=" flex flex-1 justify-between items-center gap-2  ">
                                <li>
                                    <button
                                        onClick={() => {
                                            signOut(auth);
                                        }}
                                    >
                                        <Button className="text-white h-10 border-none bg-blue-700">
                                            Sign Out
                                        </Button>
                                    </button>
                                </li>
                                <li>
                                    <Link href="/admin">
                                        <a>
                                            <Button className="bg-slate-900 text-white h-10">
                                                Write Posts
                                            </Button>
                                        </a>
                                    </Link>
                                </li>
                                <li className="rounded-full w-10 h-10 relative">
                                    <a
                                        href={`/${username.displayName.replaceAll(
                                            /\s/g,
                                            ""
                                        )}`}
                                    >
                                        <Image
                                            alt="userPIC"
                                            src={
                                                !user?.photoURL || "/avatar.png"
                                            }
                                            layout="fill"
                                            className="rounded-full"
                                        ></Image>
                                    </a>
                                </li>
                            </ul>
                        </>
                    )}

                    {!username && (
                        <Link href="/landing">
                            <a>
                                <Button className="bg-slate-900 text-white h-10">
                                    Log In
                                </Button>
                            </a>
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
}
