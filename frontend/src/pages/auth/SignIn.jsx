import React, { useState } from "react";
import { Button, Input, Logo } from "../../components";
import { IoMailOutline } from "react-icons/io5";
import { BiLockAlt } from "react-icons/bi";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const SignIn = () => {
  const navigate = useNavigate(); // Move useNavigate outside of handleSubmit

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formDetails.email) {
      toast.error("Enter a valid email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formDetails.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (!formDetails.password) {
      toast.error("Enter a valid password");
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
      .post('http://localhost:3010/login', formDetails)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: 'Success',
            text: res.data.message,
            icon: 'success',
          });
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });

    setFormDetails({ email: '', password: ''});
  };

  return (
    <section className="flex w-full h-screen">
      {/* Sign in form container */}
      <div className="basis-1/4 m-auto flex flex-col">
        <Logo customCss={"mx-auto md:mx-0"} />
        {/* Sign in form heading */}
        <div className="mt-12 mb-6 flex flex-col gap-3">
          <h2 className="text-center md:text-left font-bold text-3xl">
            Welcome back
          </h2>
          <p className="text-center md:text-left text-sm">
            New to Recipen?{" "}
            <Link
              to={"/auth/signup"}
              className="text-primary font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
        {/* Sign in form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
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
            customCss={"mt-5 rounded-lg"}
          />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
        </form>
      </div>
      {/* Sign in banner image */}
      <div className="hidden md:block basis-1/2 bg-login bg-no-repeat bg-cover bg-center"></div>
    </section>
  );
};

export default SignIn;