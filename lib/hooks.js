import { firestore, auth } from "../lib/firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const q = query(collection(firestore, "users"));
            unsubscribe = onSnapshot(q, (snapshot) => {
                setUsername(snapshot.docs);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}
