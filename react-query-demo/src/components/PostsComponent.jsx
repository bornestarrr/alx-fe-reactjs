import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

export default function PostsComponent() {
  const {
    data,
    isLoading,
    error: isError,
    refetch,
  } = useQuery("posts", fetchPosts, {
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error loading posts</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <button
        onClick={() => refetch()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refetch Posts
      </button>
      <ul className="space-y-2">
        {data.map((post) => (
          <li key={post.id} className="border p-2 rounded">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
