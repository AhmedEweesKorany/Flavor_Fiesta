import React, { useContext, useState, useEffect } from "react";
import { Logo, Button, Menu, Avatar } from "..";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn, FiMenu } from "react-icons/fi";
import { MyContext } from "../../App";
import { Profile } from "../../pages";

const Header = () => {
  // handle header based on user logged in or not
  function CheckUserData() {
    if (localStorage.getItem("username") != undefined) {
      console.log(localStorage.getItem("username"));
      console.log(localStorage.getItem("email"));
      console.log(localStorage.getItem("role"));
      console.log(localStorage.getItem("id"));


      return (
        <>
          <Avatar
            username={localStorage.getItem("username")}
            email={localStorage.getItem("email")}
          />
        </>
      );
    } else {
      console.log("not signed in");
      return (
        <>
          <Link to={"/auth/signin"} className="hidden md:block">
            <Button
              content={"Sign In "}
              customCss={"max-w-max rounded-full"}
              icon={<FiLogIn />}
            />
          </Link>
        </>
      );
    }
  }

  function CheckRole() {
    if (localStorage.getItem("role") == "admin") {
      return (
        <li>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      );
    }
  }

  const [isCollapsed, setIsCollapsed] = useState(true);
  const { userdata, setUserData } = useContext(MyContext);
  if (userdata[0]) {
    console.log(userdata);
  }
  useEffect(() => {
    if (userdata[0]) {
      localStorage.setItem("id", userdata[0].id);
      localStorage.setItem("username", userdata[0].username);

      localStorage.setItem("email", userdata[0].email);
      localStorage.setItem("role", userdata[0].role);
    }
  }, [userdata]);

  return (
    <header className="shadow-sm sticky top-0 backdrop-blur-sm bg-[#fffefc80] z-20">
      <div className="box flex justify-between items-center py-3">
        <Logo />
        {/* Desktop navbar */}
        <nav className="hidden md:block">
          {/* Navbar links */}
          <ul className="flex gap-10">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            {CheckRole()}
            <li>
              <NavLink to={"/recipe"}>Recipes</NavLink>
            </li>
            <li>
              <NavLink to={"/blog"}>Blogs</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>Contact</NavLink>
            </li>
          </ul>
        </nav>
        {/* Sign in button */}

        {CheckUserData()}

        {/* Menu button */}
        <FiMenu
          className="block md:hidden text-xl cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Mobile navbar */}
        <Menu setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
      </div>
    </header>
  );
};

export default Header;
