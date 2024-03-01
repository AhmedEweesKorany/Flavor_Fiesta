import React, { useEffect, useState } from "react";
import {
  Comment,
  Button,
  Input,
  ShareButton,
  NoData,
  ComponentLoading,
} from "../../components";
import { IoMailOutline } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { BsStopwatch } from "react-icons/bs";
import { LiaWeightSolid } from "react-icons/lia";
import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from "react-icons/ai";

import { Link, useParams } from "react-router-dom";
import { Rating, IconButton, Menu, MenuItem } from "@mui/material";

import { MoreVert } from "@mui/icons-material";
import Modal from "./Modal";
import BasicModal from "./Modal";

const SingleRecipe = () => {
  let { id } = useParams();
  id = +id;

  const [data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState([]);

  //get single recipe by fetch
  async function getData() {
    fetch(`http://localhost:3010/recipe/${id}`)
      .then((data) => data.json())
      .then((res) => {
        setData(res.data[0]);

        //sperate ingredients into state
        const ing = res.data[0].recipes_ingredients.split(",");
        const instr = res.data[0].recipes_cookingInstructions.split(",");
        setIngredients(ing);
        setInstruction(instr);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(instruction);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className="box flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Recipe image */}
          <div className="basis-1/3">
            <img className="rounded w-full" src={data.recipes_image} />
          </div>
          {/* Recipe details */}
          <div className="basis-2/3 flex flex-col gap-2">
            <div className="flex justify-between">
              <h2 className="font-bold text-xl md:text-3xl">
                {data.recipes_title}
                <progress value={0.3} />
              </h2>
              {data?.author?._id === true && (
                <>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    size="small"
                    onClick={handleMenu}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                  >
                    <MenuItem>
                      <Link to={`/recipe/edit/${id}`}>Edit</Link>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="flex gap-2 items-center font-semibold">
                <LuChefHat className="text-primary" />
                {data?.author?.name}
              </p>
              <div className="flex gap-2 p-2 bg-light rounded-l-lg">
                {/* {user?.favorites?.some((ele) => ele === id) ? (
                    <AiFillHeart
                      className="text-2xl text-red-500 cursor-pointer"
                    />
                  ) : (
                    <AiOutlineHeart
                      className="text-2xl text-red-500 cursor-pointer"
                      
                    />
                  )} */}
                <ShareButton
                  url={`${import.meta.env.VITE_BASE_URL}/recipe/${data?._id}`}
                />
              </div>
            </div>
            {/* Recipe rating */}
            <Rating
              size={"large"}
              readOnly
              value={+data.recipes_rate}
              precision={0.25}
            />

            <p className="my-4">
              {data.recipes_description}
<BasicModal>
  
  </BasicModal>              <div className="my-4">
                
              </div>
            </p>
            {/* Recipe time & cals */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between w-2/3 mx-auto">
              <div className="flex flex-col gap-1 items-center">
                <BsStopwatch className="text-5xl text-gray-800" />
                <h3 className="font-bold text-xl text-primary">Cooking Time</h3>
                <p>{data.recipes_cookingtime} minutes</p>
              </div>
              <div className="flex flex-col gap-1 items-center text-gray-800">
                <LiaWeightSolid className="text-5xl" />
                <h3 className="font-bold text-xl text-primary">Calories</h3>
                <p>{data.recipes_calories} cal</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row gap-4">
          {/* Recipe Ingredients */}
          <div className="basis-1/3 flex flex-col gap-4 border-b-2 md:border-b-0 pb-4 md:pb-0 md:border-r-2 border-gray-200 items-center">
            <h3 className="font-bold text-2xl">Ingredients</h3>
            <ol className="flex flex-col gap-2 list-decimal ml-5">
              {ingredients.map((ingredient, i) => (
                <li key={`ingredient-${i + 1}`}>{ingredient}</li>
              ))}
            </ol>
          </div>
          {/* Recipe Instructions */}
          <div className="basis-2/3 flex flex-col gap-4">
            <h3 className="font-bold text-2xl">Instructions</h3>
            <ul className="ml-2 flex flex-col gap-4">
              {instruction.map((instruction, i) => (
                <li key={`instruction-${i + 1}`}>
                  <h4 className="font-bold text-xl">Step {i + 1}</h4>
                  <p className="ml-2">{instruction}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr />
        {/* Rate recipe */}
        <>
          <div className="my-6 w-full sm:w-2/3 md:w-1/2 mx-auto flex justify-between gap-6">
            <h3 className="font-bold text-2xl">Rate the recipe</h3>
            <Rating size={"large"} precision={0.25} />
          </div>
          <hr />
        </>

        {/* Recipe comment form */}
        <div className="my-10 w-full sm:w-2/3 md:w-1/2 mx-auto flex flex-col gap-6">
          <h3 className="font-bold text-2xl">Leave a Reply</h3>
          <form className="flex flex-col gap-4">
            <Input
              type={"text"}
              id={"name"}
              icon={<AiOutlineUser />}
              handleChange={handleChange}
              value={formDetails.name}
              label={"Name"}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              id={"email"}
              icon={<IoMailOutline />}
              handleChange={handleChange}
              value={formDetails.email}
              label={"Email"}
              placeholder={"example@abc.com"}
            />
            <div className="flex flex-col relative ">
              <label htmlFor="message" className="text-sm font-semibold mb-3">
                Comment
              </label>
              <textarea
                onChange={handleChange}
                value={formDetails.message}
                id="message"
                rows={4}
                required
                aria-required="true"
                placeholder="Leave a comment..."
                className="py-2 px-4 border bg-gray-100 rounded-lg focus:outline outline-primary"
              />
            </div>
            <Button
              content={"Post comment"}
              icon={<FaRegPaperPlane />}
              type={"submit"}
              customCss={"rounded-lg gap-3 max-w-max"}
            />
          </form>
        </div>
        <hr />
        {/* Recipe comments */}
        <div className="w-full sm:w-4/5 mx-auto flex flex-col gap-6">
          <h3 className="font-bold text-2xl">Comments</h3>
          {data?.comments?.length ? (
            <div className="flex flex-col gap-6">
              {data?.comments?.map((comment) => (
                <Comment key={comment?._id} comment={comment} />
              ))}
            </div>
          ) : (
            <NoData text={"Comments"} />
          )}
        </div>
      </section>
    </>
  );
};

export default SingleRecipe;
