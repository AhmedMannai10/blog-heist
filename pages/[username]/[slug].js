import { async } from "@firebase/util";
import {
    collection,
    collectionGroup,
    getDocs,
    query,
    where,
    doc,
    limit,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import React from "react";
import PostContent from "../../components/PostContent";
import { firestore, getUserWithUsername, postToJson } from "../../lib/firebase";

export async function getStaticProps({ params }) {
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);

    let post;
    let path;

    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    if (userDoc) {
        const postRef = query(
            collection(userDoc.ref, "posts"),
            where("slug", "==", slug),
            limit(1)
        );
        const docu = (await getDocs(postRef)).docs[0];
        if (!docu) {
            return {
                notFound: true, 
            };
        }
        post = postToJson(docu);
        path = doc(userDoc.ref, "posts", slug).path;
    }
    return {
        props: { post, path },
        revalidate: 5000,
    };
}

export async function getStaticPaths() {
    const snapshot = await getDocs(collectionGroup(firestore, "posts"));

    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data();
        return {
            params: { username, slug },
        };
    });

    return {
        paths,
        fallback: "blocking",
    };
}

export default function PostPage(props) {
    const postRef = doc(firestore, props.path);
    const [realtimePost] = useDocumentData(postRef);

    const post = realtimePost || props.post;

    return (
        <main className="px-10 bg-slate-400 shadow-xl p-2 rounded-md">
            PostPage
            <section>
                <PostContent post={post} />
            </section>
            <aside className="rounded-lg shadow-lg bg-white w-fit">
                <p>
                    <strong>{post.heartCount || 0}</strong>
                </p>
            </aside>
        </main>
    );
}
