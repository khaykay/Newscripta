
import NewsCard from "./NewsCard";
import { formatArticle } from "../utils/helper";
import { FaLongArrowAltRight } from "react-icons/fa";

const CategorySection = ({ title, articles }: any) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between  mb-3">
        <h2 className="text-xl font-bold  ">{title}</h2>
        <span className="text-red-600 flex items-center">
          See All <FaLongArrowAltRight className="ml-1.5" />
        </span>
      </div>

      <div className="overflow-x-auto scroll-snap-x scrollbar-hide ">
        <div className="flex space-x-4 scroll-snap-start ">
          {articles?.length > 0 ? (
            articles.map((article: any, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] md:w-[300px]  "
              >
                <NewsCard {...formatArticle(article)} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
