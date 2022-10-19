import { async } from "@firebase/util";
import {
    collection,
    collectionGroup,
    getDocs,
    getDoc,
    doc,
} from "firebase/firestore";
import React from "react";
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
        const postRef = collection(userDoc.ref, "posts");
        const docu = await getDocs(postRef);
        console.log("\n\n---------" + docu.docs[0].data() + "-----------------\n\n");
        post = postToJson(docu.docs[0]);
        path = postRef.path;
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
    return <div>PostPage</div>;
}
