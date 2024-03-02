import React, { useContext, useState } from "react";
import { Button, Input, Logo } from "../../components";
import { IoMailOutline } from "react-icons/io5";
import { BiLockAlt } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import { MyContext } from "../../App";

const SignIn = () => {
  const navigate = useNavigate(); // Move useNavigate outside of handleSubmit

  const { userdata, setUserData } = useContext(MyContext);
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
      .post("http://localhost:3010/login", formDetails)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: res.data.message,
            icon: "success",
          });
          setUserData(res.data.data);
          navigate("/");
          setTimeout(()=>{
            window.location.reload();

          },1200)
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

    setFormDetails({ email: "", password: "" });
  };

  return (
    <>
      <section className="flex w-full h-screen relative">
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
              <Link to={"/auth/signup"} className="text-primary font-semibold">
                Create an account
              </Link>
            </p>
          </div>
          {/* Sign in form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        </div>
        {/* Sign in svg bg */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: "0", zIndex: "-1" }}
        >
          <path
            fill="#ffd700"
            fillOpacity="1"
            d="M0,320L48,288C96,256,192,192,288,154.7C384,117,480,107,576,90.7C672,75,768,53,864,64C960,75,1056,117,1152,144C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </section>
      <Footer />
    </>
  );
};

export default SignIn;
