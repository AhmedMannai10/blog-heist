import React from "react";
import Image from "next/image";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Button from "../components/Button";

export default function Landing(props) {
    const user = null;
    const username = null;
    // 1. user signed out <SignInButton />
    // 2. user signed in, but missing username <Username />
    // 3. user signed in, has username <SigneOutButton />
    return (
        <main>
            {user ? (
                !username ? (
                    <UsernameForm />
                ) : (
                    <SignOutButton />
                )
            ) : (
                <SignInButton />
            )}
        </main>
    );
}

function SignInButton() {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, new GoogleAuthProvider());
    };

    return (
        <button
            onClick={signInWithGoogle}
            className="flex justify-center bg-gray-200 hover:bg-white
                    items-center px-2 py-1 border-2 max-w-32
                  font-bold text-xl text-black  rounded-full bold "
        >
            <div className=" w-10 h-10 relative mr-2">
                <Image
                    alt="google logo"
                    layout="fill"
                    className=" relative"
                    src={`/google-logo.png`}
                />
            </div>
            <p>Sign in with Google</p>
        </button>
    );
}

function SignOutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="flex min-w-10 justify-center items-center
                  px-2 py-1 border-2 w-16 h-10 
                  font-bold text-xl text-white rounded-md  relative"
        >
            Sign Out
        </button>
    );
}

function UsernameForm() {}
