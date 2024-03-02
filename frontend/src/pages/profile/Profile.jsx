import React, { useEffect, useState } from "react";
import { Button, Input } from "../../components";
import { BiLockAlt } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const userId = localStorage.getItem('id')
  const [userName, setUserName] = useState([])
  const [userEmail, setUserEmail] = useState([])
  if(userName != undefined){
    console.log(userName);
  }
  if(userEmail != undefined){
    console.log(userEmail);
  }

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

    // form submission logic
    axios
    .post(`http://localhost:3010/updateuser/${localStorage.getItem('id')}`, formDetails)
    .then(res => {
      console.log(res)
    })
    .catch(err => {console.log(err);})
  };

  const getUser = () => {
    axios.get(`http://localhost:3010/getSingle/${userId}`)
    .then(res => {
      console.log(res.data.result)
      setUserName(res.data.result.username)
      setUserEmail(res.data.result.email)
    })
    .catch(err => console.log(err))
  } 
  useEffect(() => {
    getUser()
  }, [])

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
            id={"name"}
            icon={<AiOutlineUser />}
            handleChange={handleChange}
            value={userName}
            label={"Full Name"}
            placeholder={""}
          />
          <Input
            type={"email"}
            id={"email"}
            icon={<IoMailOutline />}
            handleChange={handleChange}
            value={userEmail}
            label={"Email"}
            
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
    </section>
  );
};

export default Profile;
