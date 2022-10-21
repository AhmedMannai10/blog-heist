import React from "react";
import AuthCheck from "../../components/AuthCheck";
import MetaTags from "../../components/MetaTags";

import {
    orderBy,
    collection,
    doc,
    query,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import kebabCase from "lodash.kebabcase";
import { ref } from "firebase/storage";
import toast from "react-hot-toast";

export default function AdminPostsPage() {
    PostList();

    return (
        <main>
            <AuthCheck>
                <MetaTags
                    title="admin page"
                    image="https://ahmedmannai.com/resources/img/ahmedimg1.jpeg"
                />

                <PostList />
                <CreateNewPost />
            </AuthCheck>
        </main>
    );
}

function PostList() {
    const ref = collection(
        doc(collection(firestore, "users"), auth.currentUser.uid),
        "posts"
    );
    const q = query(ref, orderBy("createdAt"));
    const [querySnapshot] = useCollection(q);

    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1>Manage You Posts</h1>
            <PostFeed posts={posts} admin />
        </>
    );
}

function CreateNewPost() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState("");

    // Ensure slug is Url safe
    const slug = encodeURI(kebabCase(title));

    // Validate length
    const isValid = title.length > 3 && title.length < 100;

    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = doc(
            collection(doc(collection(firestore, "users"), uid), "posts"),
            slug
        );

        console.log("sending");
        // TIP: give all fields a default value here
        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            context: "# hello world!",
            createdAt: serverTimestamp(),
            updateAt: serverTimestamp(),
            heartCount: 0,
        };

        await setDoc(ref, data);
        toast.success("Post Created!");

        router.push(`/admin/${slug}`);
    };

    return (
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Article!"
                className="border-2 rounded-md "
            />
            <p>
                <strong>Slug:</strong>
                {slug}
            </p>
            <button
                type="submit"
                disabled={!isValid}
                className=" rounded-full bg-blue-700 text-white shadow-md hover:shadow-none px-2 mt-2"
            >
                Submit
            </button>
        </form>
    );
}
