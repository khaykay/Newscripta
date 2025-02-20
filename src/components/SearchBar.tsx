import { useState } from "react";
import { useNews } from "../context/NewsContext";

const SearchBar = () => {
  const { fetchNews, loading } = useNews();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) fetchNews(query);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-2/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`w-full sm:w-auto px-4 py-2 rounded-md font-medium transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
