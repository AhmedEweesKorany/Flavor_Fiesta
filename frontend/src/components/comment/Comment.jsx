import React from "react";
import { BsCalendarCheck } from "react-icons/bs";
import { IconButton, Menu, MenuItem, Avatar as MuiAvatar } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const Comment = ({ username, comment_content }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl flex flex-col sm:flex-row gap-4 p-6 items-center">
      {/* Commented user details */}
      <MuiAvatar
        sx={{ width: 60, height: 60 }}
        className="border-2 border-primary shadow-lg"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between flex-col sm:flex-row items-center">
          <h4 className="font-bold text-lg">{username}</h4>
        </div>
        {/* Comment content */}
        <div className="flex justify-between">
          <p>{comment_content}</p>
          {/* {comment?.user?._id === userId && (
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                size="small"
                onClick={handleClick}
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
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
