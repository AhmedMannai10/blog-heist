import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

export default function Navbar() {
    const user = true;
    const username = true;

    return (
        <div className="flex  items-center md:px-40 px-10 h-16 uppercase bg-slate-900 mb-10  ">
            <ul className=" flex flex-1 justify-between items-center">
                <li>
                    <Link href="\">
                        <a>
                            <Button value={"Feed"} />
                        </a>
                    </Link>
                </li>
                <li>
                    {username && (
                        <>
                            <ul className=" flex flex-1 justify-between items-center">
                                <li>
                                    <Link href="/admin">
                                        <a>
                                            <Button value="Write Posts" />
                                        </a>
                                    </Link>
                                </li>
                                <li className="rounded border ">
                                    <Link
                                        className=" cursor-pointer"
                                        href={`/${username}`}
                                    >
                                        <a>
                                            <Image src={user?.photoURL} />
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}

                    {!username && (
                        <li>
                            <Link href="/landing">
                                <a>
                                    <Button value="Log in" />
                                </a>
                            </Link>
                        </li>
                    )}
                </li>
            </ul>
        </div>
    );
}
