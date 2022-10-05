import React from "react";

export default function Button({ children, className }) {
    return (
        <div
            className={`cursor-pointer flex min-w-10 justify-center
                 items-center px-2  border-2 w-fit 
                  font-bold text-xl rounded-md ${className} `}
        >
            {children}
        </div>
    );
}
