import { useNews } from "../context/NewsContext";
import NewsCard from "./NewsCard";
import { formatArticle } from "../utils/helper";
import { FaLongArrowAltRight } from "react-icons/fa";

const EditorsPick = () => {
  const { editorsPick } = useNews();

  return (
    <div className="mt-6">
      <div className="flex justify-between  mb-3">
        <h2 className="text-xl font-bold  ">Editor's Pick (Fashion)</h2>
        <span className="text-red-600 flex items-center">
          See All <FaLongArrowAltRight className="ml-1.5" />
        </span>
      </div>
      <h2 className="text-xl font-bold mb-4"></h2>
      <div className="overflow-x-auto scroll-snap-x scrollbar-hide ">
        <div className="flex space-x-4 scroll-snap-start">
          {editorsPick?.length > 0 ? (
            editorsPick?.map((article: any, index: number) => (
              <div key={index} className="flex-shrink-0 w-[350px] ">
                <NewsCard {...formatArticle(article)} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No fashion articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorsPick;
