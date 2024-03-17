import React, { useEffect, useState } from "react";
import { Button, Input } from "../../components";
import { BiLockAlt } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import {profileBg} from '../../assets'

const Profile = () => {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate()
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirm,setConfirm] = useState("")
  const getUser = () => {
    axios
      .get(http://localhost:3010/getSingle/${userId})
      .then((res) => {
        setFormDetails({
          username: res.data.result[0].username,
          email: res.data.result[0].email,
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDetails({ ...formDetails, [id]: value });
  };

  const validateForm = () => {
    if (
      !formDetails.username ||
      formDetails.username.length < 3 ||
      formDetails.username.length > 255
    ) {
      toast.error("Name should be between 3 and 255 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formDetails.email || !emailRegex.test(formDetails.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    // if (!formDetails.password || formDetails.password.length < 6) {
    //   toast.error("Password should be at least 6 characters long");
    //   return false;
    // }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    if(formDetails.password != confirm ){
   if(formDetails.password != "" && confirm != ""){
    toast.error("Password doesn't match");
    return;
   }
    }
    // form submission logic
    axios
      .put(
        http://localhost:3010/updateuser/${userId},
        formDetails
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Profile Updated successfully",
            icon: "success",
          });
          localStorage.setItem("username", formDetails.username);
          localStorage.setItem("email", formDetails.email);
          navigate("/")
          setTimeout(()=>{
            window.location.reload()
          },1000)
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Happened",
        });
      });
  };

  return (
    <section className="box md:max-w-5xl flex flex-col gap-12">
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-xl font-bold">Profile</h3>
        <p className="text-sm font-semibold text-gray-400">
          You can update your profile details here
        </p>
      </div>
      <div className="flex gap-6 justify-center md:justify-between items-center">
        <form
          className="flex flex-col items-center md:items-stretch gap-4 md:basis-1/2"
          onSubmit={handleSubmit}
        >
          <Input
            type={"text"}
            id={"username"}
            icon={<AiOutlineUser />}
            handleChange={handleChange}
            value={formDetails.username}
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
            label={"Password"}
            placeholder={"At least 6 characters long"}
          />

<Input
            type={"password"}
            id={"confirmpassword"}
            icon={<BiLockAlt />}
            handleChange={(e)=> setConfirm(e.target.value)}
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
          />

          <Button
            type="submit"
            content={"Save changes"}
            customCss={"max-w-max rounded text-sm px-3"}
          />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </form>
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
