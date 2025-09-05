import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <Link to="/profile" className="text-blue-500">Go to Profile</Link>
      <br />
      <Link to="/user/123" className="text-blue-500">Go to User 123</Link>
    </div>
  );
}
