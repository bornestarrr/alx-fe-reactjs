import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      {/* Navigation for nested routes */}
      <nav className="mb-4 space-x-4">
        <Link to="details" className="text-blue-500">Details</Link>
        <Link to="settings" className="text-blue-500">Settings</Link>
      </nav>

      {/* Nested routes inside Profile */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
