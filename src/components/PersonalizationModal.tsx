
import { useState} from "react";
import { useNews } from "../context/NewsContext";

const PersonalizationModal = ({ isOpen, onClose }:any) => {
  const {
    savedSources,
    savedCategories,
    savedAuthors,
    news,
    handlePreferenceUpdate,
  } = useNews();

  const [tempCategories, setTempCategories] = useState(savedCategories);
  const [tempSources, setTempSources] = useState(savedSources);
  const [tempAuthors, setTempAuthors] = useState(savedAuthors);

  const categories = ["top headlines", "fashion", "sports", "business", "food"];

  const sources = [
    ...new Set(
      news.map(
        (article) =>
          article.source?.name ||
          article.publication ||
          article?.fields?.publication ||
          "Unknown"
      )
    ),
  ];
  const authors = [
    ...new Set(
      news.map(
        (article) =>
          article?.author ||
          article?.fields?.byline ||
          article?.byline?.original ||
          "Unknown Author"
      )
    ),
  ];

const handleSave = () => {
  handlePreferenceUpdate(tempCategories, tempSources, tempAuthors); // ✅ Pass all preferences

  onClose();
};


  return (
    isOpen && (
      <div className="fixed inset-0 bg-black opacity-90 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded-lg w-96">
          <h2 className="text-xl font-bold">Personalize Your News</h2>
          <div className="mt-4">
            <h3 className="font-semibold">Categories</h3>
            {categories.map((category) => (
              <label key={category} className="block">
                <input
                  type="checkbox"
                  checked={tempCategories.includes(category)}
                  onChange={(e) =>
                    setTempCategories(
                      e.target.checked
                        ? [...tempCategories, category]
                        : tempCategories.filter((c) => c !== category)
                    )
                  }
                />
                {category}
              </label>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Sources</h3>
            {sources.map((source) => (
              <label key={source} className="block">
                <input
                  type="checkbox"
                  checked={tempSources.includes(source)}
                  onChange={(e) =>
                    setTempSources(
                      e.target.checked
                        ? [...tempSources, source]
                        : tempSources.filter((s) => s !== source)
                    )
                  }
                />
                {source}
              </label>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Authors</h3>
            {authors.map((author) => (
              <label key={author} className="block">
                <input
                  type="checkbox"
                  checked={tempAuthors.includes(author)}
                  onChange={(e) =>
                    setTempAuthors(
                      e.target.checked
                        ? [...tempAuthors, author]
                        : tempAuthors.filter((a) => a !== author)
                    )
                  }
                />
                {author}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-5">
            <button className="bg-gray-400 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PersonalizationModal;
