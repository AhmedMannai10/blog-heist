import React from "react";

export default function Button({ value}) {
    return (
        <div
            className=" cursor-pointer flex min-w-10 justify-center
                 items-center px-2 py-1 border-2
                  font-bold text-xl text-white rounded-sm "
            
        >
            {value}
        </div>
    );
}
