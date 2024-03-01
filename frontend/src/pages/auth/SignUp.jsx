import React, { useState } from "react";
import { Button, Input, Logo } from "../../components";
import { IoMailOutline } from "react-icons/io5";
import { BiLockAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const SignUp = () => {
  const navigate = useNavigate(); // Move useNavigate outside of handleSubmit

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDetails({ ...formDetails, [id]: value });
  };

  const validateForm = () => {
    if (!formDetails.name || formDetails.name.length < 3 || formDetails.name.length > 255) {
      toast.error("Name should be between 3 and 255 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formDetails.email || !emailRegex.test(formDetails.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (!formDetails.password || formDetails.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios
      .post('http://localhost:3010/register', formDetails)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Account successfully Created',
            icon: 'success',
          });
          navigate('/auth/signin'); // Use navigate here
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Check your network connection",
        });
      });

      setFormDetails({ name: '', email: '', password: ''});
    };
    
    return (
      <section className="flex w-full h-screen relative">
      {/* Sign up form container */}
      <div className="basis-1/4 m-auto flex flex-col">
        <Logo customCss={"mx-auto md:mx-0"} />
        {/* Sign up form heading */}
        <div className="mt-12 mb-6 flex flex-col gap-3">
          <h2 className="text-center md:text-left font-bold text-3xl">
            Create an account
          </h2>
          <p className="text-center md:text-left text-sm">
            Already have an account?{" "}
            <Link
              to={"/auth/signin"}
              className="text-primary font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
        {/* Sign up form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
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
            content={"Sign in"}
            type={"submit"}
            customCss={"mt-3 rounded-lg"}
          />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              
              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
        </form>
      </div>
      {/* Sign up svg bg  */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ position: "absolute", top: "0", zIndex: "-1" }}
      >
        <path
          fill="#ffd700"
          fillOpacity="1"
          d="M0,320L48,288C96,256,192,192,288,154.7C384,117,480,107,576,90.7C672,75,768,53,864,64C960,75,1056,117,1152,144C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
};

export default SignUp;
