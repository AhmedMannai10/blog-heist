import React from "react";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { signOut } from "firebase/auth";

export default function Navbar() {
    const { user, username } = useContext(UserContext);

    return (
        <div className="flex  items-center md:px-40 px-10 h-16 uppercase bg-slate-900 mb-10  ">
            <ul className=" flex flex-1 justify-between items-center">
                <li>
                    <Link href="/" >
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
                                    <Link
                                        href="/landing"
                                        onClick={() => signOut()}
                                    >
                                        <a>
                                            <Button className="text-white h-10 border-none bg-blue-700">
                                                Sign Out
                                            </Button>
                                        </a>
                                    </Link>
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
                                <li className="rounded border">
                                    <Link
                                        className=" cursor-pointer"
                                        href={`/${username}`}
                                    >
                                        <a>
                                            <Image
                                                alt="userPIC"
                                                src={user?.photoURL}
                                            />
                                        </a>
                                    </Link>
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
