import React from "react";
import PostsComponent from "./components/PostsComponent";

function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        React Query Demo
      </h1>
      <PostsComponent />
    </div>
  );
}

export default App;
