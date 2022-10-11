import React from "react";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { getUserWithUsername } from "../../lib/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export async function getServerSideProps({ query }) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    let user = null;
    let posts = null;

    if (userDoc) {
        //JSON serializable data
        let user = null;
        let posts = null;

        if (userDoc) {
            user = userDoc.data();
            const postsQuery = query(
                collection(userDoc.ref, "posts"),
                where("published", "==", true),
                orderBy("createdAt", "desc"),
                limit(5)
            );

            posts =  (await (await getDocs(postsQuery)).docs.map(postToJson))
        }
    }

    return {
        props: { user, posts },
    };
}

export default function UserProfilePage({ user, posts }) {
    return (
        <div>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </div>
    );
}
