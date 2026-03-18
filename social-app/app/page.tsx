"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Post = {
  id: string;
  content: string;
  user: {
    clerkId: string;
  };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetch("/api/posts");
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      console.log("GET POSTS:", data);
      setPosts(data);
    };

    loadPosts();
  }, []);

  // Create post
  const createPost = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const text = await res.text();
    console.log("POST RESPONSE:", text);

    setContent("");

    // Reload posts
    const updated = await fetch("/api/posts");
    const text2 = await updated.text();
    const data2 = text2 ? JSON.parse(text2) : [];
    setPosts(data2);
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-white">Feed</h1>

      <Dialog.Root>
        <Dialog.Trigger className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Post
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-[90%] max-w-md 
            -translate-x-1/2 -translate-y-1/2 
            bg-gray-800 text-white p-6 rounded-xl space-y-4"
          >
            <Dialog.Title className="text-lg font-semibold">
              Create Post
            </Dialog.Title>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 bg-gray-700 rounded text-white"
            />

            <button
              onClick={createPost}
              className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
            >
              Post
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* POSTS */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700"
          >
            <p className="text-white">{post.content}</p>
            <p className="text-xs text-gray-400 mt-2">
              {post.user.clerkId}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}