import React, { useState } from "react";
import {
  Avatar as MuiAvatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import {
  Article,
  Description,
  Fastfood,
  Favorite,
  Logout,
  RestaurantMenu,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Avatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.setItem("persist", false);
    navigate("/auth/signin");
  };

  return (
    <div className="ml-auto md:ml-0">
      {/* Yellow border only for pro users */}
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MuiAvatar
     
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiMuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link to={"/profile"} className="flex items-center">
            <MuiAvatar /> Profile
          </Link>
        </MenuItem>

        <Box>
          <Divider />
          <MenuItem>
            <Link to="/recipe/add" className="flex items-center">
              <ListItemIcon>
                <RestaurantMenu fontSize="small" />
              </ListItemIcon>
              Add new recipe
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/blog/add" className="flex items-center">
              <ListItemIcon>
                <Article fontSize="small" />
              </ListItemIcon>
              Add new blog
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/recipe/my-recipes" className="flex items-center">
              <ListItemIcon>
                <Fastfood fontSize="small" />
              </ListItemIcon>
              My recipes
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/blog/my-blogs" className="flex items-center">
              <ListItemIcon>
                <Description fontSize="small" />
              </ListItemIcon>
              My blogs
            </Link>
          </MenuItem>
        </Box>

        <MenuItem>
          <Link to="/recipe/saved" className="flex items-center">
            <ListItemIcon>
              <Favorite fontSize="small" />
            </ListItemIcon>
            Saved recipes
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Avatar;
