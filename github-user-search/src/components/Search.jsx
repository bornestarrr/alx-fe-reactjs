import React, { useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [form, setForm] = useState({
    username: '',
    location: '',
    minRepos: '',
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildQuery = () => {
    let query = '';
    if (form.username.trim()) query += `${form.username.trim()} in:login`;
    if (form.location.trim()) query += ` location:${form.location.trim()}`;
    if (form.minRepos.trim()) query += ` repos:>=${form.minRepos.trim()}`;
    return query.trim();
  };

  const fetchUsers = async (pageNum = 1) => {
    const query = buildQuery();
    if (!query) {
      setError('Please enter at least one search criterion.');
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${pageNum}&per_page=10`
      );
      if (pageNum === 1) {
        setUsers(response.data.items);
      } else {
        setUsers((prev) => [...prev, ...response.data.items]);
      }
      setTotalCount(response.data.total_count);
      setPage(pageNum);
    } catch (err) {
      setError('Error fetching users.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const loadMore = () => {
    fetchUsers(page + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          name="username"
          placeholder="GitHub username"
          value={form.username}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location (e.g., San Francisco)"
          value={form.location}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="number"
          name="minRepos"
          placeholder="Minimum repos count"
          value={form.minRepos}
          onChange={handleChange}
          min="0"
          className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {users.length > 0 && (
        <>
          <p className="mb-2">Showing {users.length} of {totalCount} users</p>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="flex items-center gap-4 border p-3 rounded shadow">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {user.login}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {users.length < totalCount && (
            <button
              onClick={loadMore}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}
