import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <nav className="mb-4 space-x-4">
        <Link to="details" className="text-blue-500">Details</Link>
        <Link to="settings" className="text-blue-500">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}
