import React from 'react'
import { CardProps } from '../types';
import arrow from "/arrow.svg";


const TopHeading: React.FC<CardProps> = ({
  title,
  description,
  url,
  imageUrl,
  source,
  author,
  tag,
  publishedAt,
  index
}) => {
  const formattedDate = new Date(publishedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
    
      <div
        className={
          index === 0
            ? "col-span-full  mb-5 rounded-tl-[80px] relative"
            : "col-span-1 min-h-[27rem]  "
        }
        key={index}
      >
        <article
          className={
            index === 0
              ? "border-solid  bg-gray-200 h-[400px] rounded-tl-[80px] relative"
              : " h-[335px]"
          }
        >
          <span className="">
            <img
              src={imageUrl}
              alt={title}
              className={
                index === 0
                  ? "border-solid border-black border-[1.5px] w-full  h-full rounded-tl-[80px] relative"
                  : "h-[200px] w-full object-cover border-solid border-black border-[1.5px]"
              }
            />
          </span>
          <div
            className={
              index === 0
                ? "w-full flex justify-center text-white absolute bottom-6"
                : ""
            }
          >
            <div
              className={
                index === 0
                  ? "   w-[95%] opacity-80  bg-black bg-clip-padding backdrop-filter backdrop-blur-2xl border-[1.5px] border-white border-solid p-6 "
                  : ""
              }
            >
              <span className="flex relative ">
                {title && (
                  <h3
                    className={
                      index === 0
                        ? "capitalize pb-4 font-semibold "
                        : "mt-4 mb-2 font-semibold capitalize line-clamp-2  text-sm max-w-[90%] "
                    }
                  >
                    {title}
                  </h3>
                )}
                <span
                  className={
                    index === 0
                      ? "hidden"
                      : "inline-flex  my-4 items-center absolute right-0"
                  }
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 inline-block"
                  >
                    <img src={arrow} alt="arrow" className="h-4 " />
                  </a>
                </span>
              </span>
              {description && (
                <div className="max-w-prose">
                  <p
                    className={
                      index === 0 ? "hidden" : "line-clamp-2 text-xs mb-3 "
                    }
                  >
                    {description}
                  </p>
                </div>
              )}
              <span
                className={
                  index === 0 ? "flex justify-between items-center" : ""
                }
              >
                <span
                  className={
                    index === 0
                      ? "flex gap-x-8 "
                      : "flex justify-between w-full px-1"
                  }
                >
                  <span className={"flex flex-col gap-y-1 "}>
                    <span className="text-[10px] font-semibold">
                      Written by{" "}
                    </span>
                    <span className="text-xs font-semibold">{author}</span>
                  </span>
                  <span className={"flex flex-col gap-y-1"}>
                    <span className="text-[10px] font-semibold">
                      Published on
                    </span>
                    <span className="text-xs font-semibold">
                      {formattedDate}
                    </span>
                  </span>
                </span>
                <p
                  className={
                    index === 0
                      ? "hidden"
                      : "text-xs text-gray-500 font-semibold mt-2 p-1"
                  }
                >
                  <span className="text-[10px] ">Source:</span>{" "}
                  {typeof source === "string"
                    ? source
                    : source?.name || "Unknown"}
                </p>
                <span className={index === 0 ? "flex flex-col gap-y-1" : ""}>
                  <span
                    className={
                      index === 0 ? "text-[10px] font-semibold" : "hidden"
                    }
                  >
                    File under
                  </span>
                  <span
                    className={index === 0 ? "flex gap-x-1" : " flex gap-x-1"}
                  >
                    <span
                      className={
                        index === 0
                          ? "border border-solid border-white px-2 rounded-xl text-xs  capitalize "
                          : "border border-solid border-black px-2 rounded-xl text-xs  capitalize mt-3"
                      }
                    >
                      {tag}
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default TopHeading