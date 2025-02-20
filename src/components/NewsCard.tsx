import React from "react";

type NewsCardProps = {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  source?: any;
  author?: string;
  tag?: string;
  publishedAt: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  url,
  imageUrl,
  source,
  author,
  tag,
  publishedAt,
}) => {
  const formattedDate = new Date(publishedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-md"
        />
      )}
      {title && <h2 className="text-black text-lg font-bold mt-2">{title}</h2>}
      {description && <p className="text-gray-600 mt-1">{description}</p>}
      <p className="text-sm text-gray-500">
        Source:{" "}
        {typeof source === "string" ? source : source?.name || "Unknown"}
      </p>
      <p className="text-sm text-gray-500">Author: {author}</p>
      <p className="text-sm text-gray-500">Published at: {formattedDate}</p>
      <p className="text-sm text-gray-500">{tag}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 mt-2 inline-block"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
