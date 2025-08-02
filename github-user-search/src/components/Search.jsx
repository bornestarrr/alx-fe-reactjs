import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");

  const buildQuery = (username, location, minRepos) => {
    let query = "";
    if (username) query += `${username} `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos}`;
    return query.trim();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNoResults(false);
    setError("");
    setUsers([]);

    try {
      const query = buildQuery(username, location, minRepos);
      const results = await fetchUserData(query);
      if (results.length === 0) {
        setNoResults(true);
      }
      setUsers(results);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>
      <form onSubmit={handleSearch} className="grid gap-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Min Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}

      {noResults && (
        <p className="text-center text-red-500 font-semibold">
          Looks like we cant find the user.
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded flex items-center gap-4 shadow-sm"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-bold">{user.login}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
