import { firestore, auth } from "../lib/firebase";
import { doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            unsubscribe = onSnapshot(
                doc(firestore, "users", "uid"),
                (snapshot) => {
                    setUsername(snapshot.data());
                }
            );
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}
