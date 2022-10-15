import { firestore, auth } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const ref = doc(firestore, "users", `${user.uid}`);
            unsubscribe = onSnapshot(ref, (snapshot) => {
                setUsername(snapshot.data()?.username);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}
