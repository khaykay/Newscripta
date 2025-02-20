import { FC } from "react";
import NewsCard from "./NewsCard";

interface Article {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  source?: string;
  author?: string;
  publishedAt: string;
  tag?: string;
}

interface CategorySectionProps {
  title: string;
  articles: Article[];
}

const CategorySection: FC<CategorySectionProps> = ({ title, articles }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.length > 0 ? (
          articles?.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))
        ) : (
          <p className="text-gray-500">No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
