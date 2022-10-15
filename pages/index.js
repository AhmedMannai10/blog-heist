import Link from "next/link";
import Loader from "../components/Loader";
import { useState } from "react";
import {
    fromMillis,
    collectionGroup,
    where,
    getDocs,
    limit,
    orderBy,
    startAfter,
} from "firebase/firestore";
import { firestore, postToJson } from "../lib/firebase";
import PostFeed from "../components/PostFeed";
import Button from "../components/Button";

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(content) {
    // <collectionGroup -> grap any sub collection no matter where it is nested in the firestore

    const postsQuery = collectionGroup(
        firestore,
        "posts",
        where("published", "==", true),
        orderBy("createdAt", "desc"),
        limit(LIMIT)
    );

    const posts = (await getDocs(postsQuery)).docs.map(postToJson);

    return {
        props: { posts },
    };
}

export default function Home(props) {
    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(false);

    const [postsEnd, setPostsEnd] = useState(false);

    const gerMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];

        console.log(last.createdAt);

        const cursor =
            typeof last.createdAt === "number"
                ? fromMillis(last.createdAt)
                : last.createdAt;

        const query = collectionGroup(
            firestore,
            "posts",
            where("published", "==", true),
            orderBy("createdAt", "desc"),
            startAfter(cursor).limit(LIMIT)
        );

        const newPosts = (await getDocs(query)).map((doc) => doc.data());

        setPosts(posts.concat(newPosts));
        setLoading(false);

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
    };

    return (
        <div className="md:px-10 flex flex-col gap-10">
            <PostFeed posts={posts} />

            {!loading && !postsEnd && (
                <button
                    onClick={gerMorePosts}
                    className="border border-sm rounded-md bg-gray-700 w-fit px-3 text-white"
                >
                    Load More
                </button>
            )}
            <Loader show={loading} />
            {postsEnd && "You Have Reached the END"}
        </div>
    );
}
