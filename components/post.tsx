import Link from "next/link";
import React from "react";

export function Post({ post }: { post: any }) {
  const createdAt = new Date(parseInt(post.createdAt)).toDateString();

  return (
    <div className="p-3 bg-white rounded-md mb-2 hover:shadow-sm">
      <h4 className="text-xl mb-2">{post.title}</h4>
      <p>{post.content}</p>

      <Link className="hover:text-rose-500" href={`/profile/${post?.user?.id}`}>
        <span className="font-light">
          posted by {post?.user?.name} on {createdAt}
        </span>
      </Link>
    </div>
  );
}
