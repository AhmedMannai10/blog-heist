import React, { useCallback } from "react";
import Image from "next/image";
import { auth, firestore } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { doc, getDoc, writeBatch } from "firebase/firestore";

export default function Landing(props) {
    const { user, username } = useContext(UserContext);

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
            onClick={() => signOut(auth)}
            className="flex min-w-10 justify-center items-center
                  px-2 py-1 border-2 w-fit h-10 
                  font-bold text-xl text-black rounded-md  relative"
        >
            Sign Out
        </button>
    );
}

// username form
function UsernameForm() {
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        const userDoc = await getDoc(firestore, `users/${user.uid}`);
        const usernameDoc = await getDoc(firestore, `username/${formValue}`);

        // Commit both docs together as a batch write.
        const batch = writeBatch(firestore);
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL,
            displayName: user.displayName,
        });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();
    };

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);



    function UsernameMessage({ username, isValid, loading }) {
        if (loading) {
            return <p>Checking .....</p>;
        } else if (isValid) {
            return <p className=" text-green-500">{username} is available!</p>;
        } else if (username && !isValid) {
            return (
                <p className=" text-red-500">
                    {username} That username is taken!
                </p>
            );
        } else {
            return <p></p>;
        }
    }

    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work

    // it will work only when the use stop typing for 500 ms before running the checkUsername function
    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = doc(firestore, `username`, `${username}`);
                const docSnap = await getDoc(ref);
                console.log("Firesotre read executed!");
                setIsValid(!docSnap.exists());
                setLoading(false);
            }
        }, 500),
        []
    );

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input
                        name="username"
                        placeholder="username"
                        value={formValue}
                        onChange={onChange}
                        autoComplete="false"
                    />

                    <UsernameMessage
                        username={formValue}
                        isValid={isValid}
                        loading={loading}
                    />

                    <button
                        type="submit"
                        className=" font-bold px-4 h-10 w-fit bg-black rounded-full text-white"
                        disabled={!isValid}
                    >
                        Choose
                    </button>
                    <h3>Debug State</h3>
                    <div>
                        Username : {formValue}
                        <br />
                        Loading : {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    );
}
