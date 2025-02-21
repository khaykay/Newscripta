
import React from "react";
import { CardProps } from "../types";


const NewsCard: React.FC<CardProps> = ({
  title ,
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
    <div className="bg-white shadow-md rounded-lg p-4 h-[98%] flex flex-col justify-between ">
      <div className="">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-md"
          />
        )}
        {title && (
          <h2 className="text-black text-lg font-bold mt-2">{title}</h2>
        )}
        {description && (
          <p className="text-gray-600 mt-1 text-sm">{description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-bold text-black">Source:</span>{" "}
          {typeof source === "string" ? source : source?.name || "Unknown"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {" "}
          <span className="font-bold text-black">Author: </span> {author}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-bold text-black">Published on: </span>
          {formattedDate}
        </p>
        <span className="inline-flex text-sm text-gray-500 mt-2 border border-solid border-gray-500 px-2 py-1 rounded-2xl">
          {tag}
        </span>
      </div>
      <div className="">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mt-2 inline-block"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
