import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
// Component's children only shown to logged-in users
const AuthCheck = (props) => {
    const { username } = useContext(UserContext);

    return username
        ? props.children
        : props.fallback || <Link href="/landing">You must be signed in</Link>;
};

export default AuthCheck;
