import React from "react";
import Image from "next/image";
const UserProfile = ({ user }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <span className=" relative rounded-full h-32 w-32">
                <Image
                    alt={`${user.displayName} picture`}
                    src={user.photoURL || "/avatar.png"}
                    layout="fill"
                    className="rounded-full"
                />
            </span>

            <p>
                <i className=" font-bold">@{user.username}</i>
            </p>
            <h1>{user.displayName}</h1>
        </div>
    );
};

export default UserProfile;
