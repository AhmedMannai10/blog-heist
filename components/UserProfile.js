import { userAgent } from "next/server";
import React from "react";
import Image from "next/image";
const UserProfile = ({ user }) => {
    return (
        <div>
            <Image
                alt="post image"
                src={user}
                className=" border-2 rounded-md bg-gray-400 text-slate-900"
            />
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayname}</h1>
        </div>
    );
};

export default UserProfile;
