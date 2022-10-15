import React from "react";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { postToJson, getUserWithUsername } from "../../lib/firebase";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    where,
    query,
} from "firebase/firestore";

export async function getServerSideProps(context) {
    const { username } = context.query;


    const userDoc = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    // -> 404 page
    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    if (userDoc) {
        user = userDoc.data();
        const postsQuery = query(
            collection(userDoc.ref, "posts"),
            where("published", "==", true),
            orderBy("createdAt", "desc"),
            limit(5)
        );

        posts = (await getDocs(postsQuery)).docs.map(postToJson);
    }

    return {
        props: { user, posts }, // will be passed to the page component as props
    };
}

export default function UserProfilePage({ user, posts }) {
    // console.log(user, posts);
    return (
        <div className="flex flex-col gap-4">
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </div>
    );
}
