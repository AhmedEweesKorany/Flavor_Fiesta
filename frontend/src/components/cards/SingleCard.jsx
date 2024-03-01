import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import ShareButton from "../shareButton/ShareButton";

const SingleCard = ({ singleData, type }) => {
  const averageRating = singleData.recipes_rate;

  if (type == "recipe") {
    return (
      <div className="flex flex-col gap-1 justify-between shadow hover:shadow-lg rounded">
        {/* Card Top */}
        <div className="flex flex-col justify-between h-full ">
          <div className="relative h-full w-full">
            {/* Only for singleData */}
            {/* Favorite & share button */}

            {/* Card image */}
            <img
              src={singleData?.recipes_image}
              alt={singleData?.title}
              className="w-full object-cover object-center rounded-t"
              width={"400px"}
              height={"400px"}
            />
            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-[#fffcf5d3] p-4 flex justify-between">
              <h4 className="font-bold">{singleData?.author?.name}</h4>
            </div>
          </div>
          {/* Card Bottom details */}
          <div className="flex flex-col gap-3 p-4">
            {/* Card heading */}
            <h4 className="font-bold text-lg">{singleData?.recipes_title}</h4>
            {/* Card description */}
            <p className="text-sm">
              {singleData?.recipes_description.substring(0, 100)}...
            </p>
            {/* Card rating */}
            {type === "recipe" && (
              <Rating value={averageRating} readOnly size={"medium"} />
            )}
          </div>
        </div>
        {/* Read more link */}
        <Link
          to={`/${type}/${singleData.recipes_id}`}
          className="flex gap-2 items-center p-4 mt-4 max-w-max hover:border-primary hover:text-primary"
        >
          Read more
          <BsArrowUpRight />
        </Link>
      </div>
    );
  } else if (type == "blog") {
    return (
      <div className="flex flex-col gap-1 justify-between shadow hover:shadow-lg rounded">
        {/* Card Top */}
        <div className="flex flex-col justify-between h-full ">
          <div className="relative h-full w-full">
            {/* Only for singleData */}
            {/* Favorite & share button */}

            {/* Card image */}
            <img
              src={singleData?.blog_image}
              alt={singleData?.blog_title}
              className="w-full object-cover object-center rounded-t"
            />
            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-[#fffcf5d3] p-4 flex justify-between">
              <h4 className="font-bold">{singleData.blog_author}</h4>
            </div>
          </div>
          {/* Card Bottom details */}
          <div className="flex flex-col gap-3 p-4">
            {/* Card heading */}
            <h4 className="font-bold text-lg">{singleData?.blog_title}</h4>
            {/* Card description */}
            <p className="text-sm">{singleData?.blog_content.substring(0,100)}...</p>
            {/* Card rating */}
            {type === "recipe" && (
              <Rating value={averageRating} readOnly size={"medium"} />
            )}
          </div>
        </div>
        {/* Read more link */}
        <Link
          to={`/${type}/${singleData.blog_id}`}
          className="flex gap-2 items-center p-4 mt-4 max-w-max hover:border-primary hover:text-primary"
        >
          Read more
          <BsArrowUpRight />
        </Link>
      </div>
    );
  }
};

export default SingleCard;
