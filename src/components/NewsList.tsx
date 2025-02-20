import { useNews } from "../context/NewsContext";
import NewsCard from "./NewsCard";

const NewsList = ({ filteredNews, loading }: any) => {
  // const { filteredNews, loading } = useNews();

  // Normalize API response to match NewsCardProps
  const formatArticle = (article: any) => ({
    title:
      article.title || article.webTitle || article.headline.main || "Untitled",
    description:
      article.description ||
      article.abstract ||
      article.fields?.headline ||
      article.fields?.bodyText ||
      "No description available.",
    url: article.url || article.web_url || article.fields.webUrl || "#",
    imageUrl:
      article.urlToImage ||
      article.thumbnail ||
      article.fields?.thumbnail ||
      "",
    source:
      article.source?.name ||
      article.publication ||
      article?.fields?.publication ||
      "Unknown",
    publishedAt:
      article.publishedAt || article.webPublicationDate || article.pub_date,
    author:
      article?.author ||
      article?.fields?.byline ||
      article?.byline?.original ||
      "Unknown Author",
    tag: article.pillarName || article.section_name || "General",
  });

  return (
    <div className="mt-6">
      {loading ? (
        <p className="text-center text-blue-500 font-medium">
          Fetching news...
        </p>
      ) : filteredNews.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((article: any, index: number) => (
            <NewsCard key={index} {...formatArticle(article)} /> // Pass normalized data
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;
