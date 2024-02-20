import React, { useState } from "react";
import { Button, Input } from "../../components";
import { BiLockAlt } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { profileBg } from "../../assets";
import { CircularProgress, Avatar as MuiAvatar } from "@mui/material";
import uploadImage from "../../common/uploadImage";

const Profile = () => {

  const [formDetails, setFormDetails] = useState({
    name: "",
    email:  "",
    image: "",
    password: "",
  });

  const [progress, setProgress] = useState(0);


  const handleChange = (e) => {
    if (e.target.id === "image") {
      uploadImage(e, setProgress, setFormDetails, formDetails);
    } else {
      setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
    }
  };

 

  return (
    <section className="box md:max-w-5xl flex flex-col gap-12">
      {/* Profile heading */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-xl font-bold">Profile</h3>
        <p className="text-sm font-semibold text-gray-400">
          You can update your profile details here
        </p>
      </div>
      <div className="flex gap-6 justify-center md:justify-between items-center">
        {/* Profile form */}
        <form
          className="flex flex-col items-center md:items-stretch gap-4 md:basis-1/2"
        >
          {/* Upload image */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:mb-4">
            {progress > 0 && progress < 100 ? (
              <CircularProgress
                color="warning"
                size={30}
              />
            ) : (
              <MuiAvatar
                
                src={formDetails.image}
                sx={{ width: 80, height: 80 }}
                className="border-2 border-primary"
              />
            )}

            <div className="flex flex-col">
              <label
                htmlFor="image"
                className="bg-primaryLight hover:bg-primary text-light py-2 px-4 shadow-lg font-semibold text-center rounded max-w-max text-sm cursor-pointer"
              >
                Change profile
              </label>
              <input
                type="file"
                onChange={handleChange}
                id="image"
                className="hidden"
              />
            </div>
          </div>
          <Input
            type={"text"}
            id={"name"}
            icon={<AiOutlineUser />}
            handleChange={handleChange}
            value={formDetails.name}
            label={"Full Name"}
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
          <Input
            type={"password"}
            id={"password"}
            icon={<BiLockAlt />}
            handleChange={handleChange}
            value={formDetails.password}
            label={"Password"}
            placeholder={"At least 6 characters long"}
          />
          <Button
            type="submit"
            content={"Save changes"}
            customCss={"max-w-max rounded text-sm px-3"}
          />
        </form>
        {/* Profile banner */}
        <div className="hidden md:block md:basis-1/3">
          <img
            src={profileBg}
            alt="profile page banner"
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
