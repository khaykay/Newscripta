import { useNews } from "../context/NewsContext";
import { useState } from "react";
const Filters = () => {
  const {
    selectedSources,
    setSelectedSources,
    selectedCategories,
    setSelectedCategories,
    selectedAuthors,
    setSelectedAuthors,
    applyFilters,
    resetFilters,
    news,
    fetchDefaultNews,
  } = useNews();

  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  // Extract unique sources, categories, and authors from API data
  const uniqueSources = Array.from(
    new Set(
      news.map(
        (article) =>
          article.source?.name ||
          article.publication ||
          article?.fields?.publication ||
          "Unknown"
      )
    )
  ).filter(Boolean);

  const uniqueCategories = Array.from(
    new Set(
      news.map(
        (article) => article.pillarName || article.section_name || "General"
      )
    )
  ).filter(Boolean);

  const uniqueAuthors = Array.from(
    new Set(
      news.map(
        (article) =>
          article.author ||
          article.byline?.original ||
          article?.fields?.byline ||
          "Unknown Author"
      )
    )
  ).filter(Boolean);

  const handleFilterChange =
    (setter: (value: string[]) => void, setLocal: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setLocal(value);
      setter(value ? [value] : []);
      applyFilters();
    };

  // Reset both local state and context state
  const handleReset = () => {
    setSource("");
    setCategory("");
    setAuthor("");
    resetFilters();
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
      <select
        value={source}
        onChange={handleFilterChange(setSelectedSources, setSource)}
        className="w-full sm:w-auto p-2 border rounded-md"
      >
        <option value="">All Sources</option>
        {uniqueSources.map((source, index) => (
          <option key={index} value={source}>
            {source}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={handleFilterChange(setSelectedCategories, setCategory)}
        className="w-full sm:w-auto p-2 border rounded-md"
      >
        <option value="">All Categories</option>
        {uniqueCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={author}
        onChange={handleFilterChange(setSelectedAuthors, setAuthor)}
        className="w-full sm:w-auto p-2 border rounded-md"
      >
        <option value="">All Authors</option>
        {uniqueAuthors.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>

      {/* Reset Filters Button */}
      <button
        onClick={handleReset}
        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Reset Filters
      </button>
      <button
        onClick={() => {
          setSelectedSources([]);
          setSelectedCategories([]);
          setSelectedAuthors([]);
          fetchDefaultNews();
        }}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Home
      </button>
    </div>
  );
};
export default Filters;
