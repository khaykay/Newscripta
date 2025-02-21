
import { formatArticle } from "../utils/helper";
import TopHeading from "./TopHeading";

const NewsList = ({ filteredNews, loading,}: any) => {
  
  return (
    <div className="mt-6">
      {loading ? (
        <p className="text-center text-blue-500 font-medium">
          Fetching news...
        </p>
      ) : filteredNews.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-3 tracking-wider">Must Read</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5">
            {filteredNews.map((article: any, index: number) => (
              <TopHeading
                key={index}
                {...formatArticle(article)}
                index={index}
              /> // Pass normalized data
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList;
