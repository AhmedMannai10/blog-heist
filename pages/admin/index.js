import React from "react";
import AuthCheck from "../../components/AuthCheck";
import MetaTags from "../../components/MetaTags";
export default function AdminPostsPage() {
    return (
        <main>
            <AuthCheck>
                <MetaTags
                    title="admin page"
                    image="https://ahmedmannai.com/resources/img/ahmedimg1.jpeg"
                />

                <h1>Admin posts</h1>
            </AuthCheck>
        </main>
    );
}
