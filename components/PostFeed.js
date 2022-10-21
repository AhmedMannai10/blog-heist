import React from "react";
import Link from "next/link";

const PostFeed = ({ posts, admin }) => {
    return (
        posts &&
        posts.map((post) => (
            <PostItem post={post} key={post.slug} admin={admin} />
        ))
    );
};

function PostItem({ post, admin = false }) {
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);

    return (
        <div className=" shadow-md bg-slate-200  p-4 rounded-md ">
            <Link href={`/${post.username}`}>
                <a>
                    <b>By @{post.username}</b>
                </a>
            </Link>

            <Link href={`/${post.username}/${post.slug}`}>
                <h2 className="cursor-pointer">
                    <a>
                        <b>{post.title}</b>
                    </a>
                </h2>
            </Link>
            <footer>
                <span>
                    {wordCount} words. {minutesToRead} min read
                    <span>💗 {post.heartCount} Hearts</span>
                </span>
                <span>Published Date {post.publishedAt}</span>
            </footer>
        </div>
    );
}

export default PostFeed;
