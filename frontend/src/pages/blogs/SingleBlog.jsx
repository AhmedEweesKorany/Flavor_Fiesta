import React, { useEffect, useState } from "react";
import {
  Comment,
  Button,
  Input,
  NoData,
  ComponentLoading,
} from "../../components";
import { format, formatDate } from "date-fns"; // Importing date-fns for date formatting

import { IoMailOutline } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";
import { BsFillPersonFill, BsCalendarCheck } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import { Link, useNavigate, useParams } from "react-router-dom";
import dateFormat from "../../common/dateFormat";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  async function getData() {
    await fetch(`http://localhost:3010/blog/${id}`)
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setData(res.data[0]);
        console.log(data);
      });
  }

  const [formDetails, setFormDetails] = useState({
    name: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
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

  const handleMenuDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      navigate("/blog");
    }
    setAnchorEl(null);
  };
  // handle comment submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formDetails.message) {
      Swal.fire("please write a comment", "", "error");
    } else {
      axios
        .post("http://localhost:3010/addcomment", {
          userID: localStorage.getItem("id"),
          message: formDetails.message,
          recipeID: null,
          blogID: id,
          username: localStorage.getItem("username"),
        })
        .then((data) => {
          Swal.fire("comment added", "", "success");
          axios
            .get(`http://localhost:3010/getcommentsbyblog/${id}`)
            .then((data) => setComments(data.data.data));
        })
        .catch((e) => {
          console.log(e);
          Swal.fire("err", "", "error");
        });
    }
  };

  useEffect(() => {
    getData();
    axios
      .get(`http://localhost:3010/getcommentsbyblog/${id}`)
      .then((data) => setComments(data.data.data));
  }, []);
  return (
    <>
      <section className="box flex flex-col gap-8">
        <div className="w-3/4 mx-auto flex flex-col gap-4">
          <div className="flex justify-between">
            {/* Blog heading */}
            <h2 className="font-bold text-2xl md:text-4xl text-center mb-6">
              {data?.blog_title}
            </h2>
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
                  <Link to={`/blog/edit/${id}`}>Edit</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
              </Menu>
            </>
          </div>
          {/* Blog image */}
          <img
            src={data?.blog_image}
            alt={data?.blog_title}
            className="rounded w-full h-[500px] object-cover object-center"
          />
          {/* Blog author & date */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="flex text-sm md:text-lg gap-2 items-center font-bold">
              <BsFillPersonFill className="text-primary" />
              {data?.blog_author}
            </h3>
            <span className="flex gap-2 items-center text-sm">
              <BsCalendarCheck />
              {new Date(data.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Blog content */}
          <ReactMarkdown>{data?.blog_content}</ReactMarkdown>
        </div>
        <hr />
        {/* Blog comment form */}
        <div className="my-6 w-full sm:w-2/3 md:w-1/2 mx-auto flex flex-col gap-6">
          <h3 className="font-bold text-2xl">Leave a Reply</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        {/* Blog comments */}
        <div className="w-full sm:w-4/5 mx-auto flex flex-col gap-6">
          <h3 className="font-bold text-2xl">Comments</h3>
          {comments.length ? (
            <div className="flex flex-col gap-6">
              {comments?.map((comment) => (
                <Comment
                  key={comment?._id}
                  username={comment.username}
                  comment_content={comment.comment_content}
                />
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

export default SingleBlog;
