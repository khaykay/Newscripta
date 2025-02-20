import { useNews } from "../context/NewsContext";
import NewsCard from "./NewsCard";

const EditorsPick = () => {
  const { editorsPick } = useNews();

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Editor's Pick (Fashion)</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {editorsPick?.length > 0 ? (
          editorsPick?.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))
        ) : (
          <p className="text-gray-500">No fashion articles found.</p>
        )}
      </div>
    </div>
  );
};

export default EditorsPick;
