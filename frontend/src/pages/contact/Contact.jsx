import React, { useState } from "react";
import { Button, Input } from "../../components";
import toast, { Toaster } from 'react-hot-toast';
import { IoMailOutline } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

const Contact = () => {

  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email:  "",
    message: "",
  });
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const validateForm = () => {
    const namePattern = /^[a-zA-Z]{3,}(?: [a-zA-Z]{3,})*$/;
    if (!formDetails.firstName || formDetails.firstName.length < 3 || formDetails.firstName.length > 255 || !namePattern.test(formDetails.firstName)) {
      toast.error("First name should be more than 3 characters long and should not include special characters!");
      return false;
    }
    if (!formDetails.lastName || formDetails.lastName.length < 3 || formDetails.lastName.length > 255 || !namePattern.test(formDetails.lastName)) {
      toast.error("Last name should be more than 3 characters long and should not include special characters!");
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formDetails.email || !emailPattern.test(formDetails.email)) {
      toast.error("Enter a valid email address!");
      return false;
    }
    const messagePattern = /^.{10,}$/;
    if (!formDetails.message || !messagePattern.test(formDetails.message)) {
      toast.error("Message should be at least 10 characters long!");
      return false;
    }
    return true;
  };
  

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Send email using Formspree
    fetch('https://formspree.io/f/mnqevwjy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formDetails,
        _subject: 'New message from website',
      }),
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Your message has been sent successfully!',
        });
        setFormDetails({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to send message. Please try again later.',
      });
    });
  };

  return (
    <section className="box flex flex-col-reverse md:flex-row w-full gap-12 md:gap-6 justify-center items-center">
      {/* Contact page left */}
      <div className="basis-1/2 lg:basis-1/3 bg-gradient-to-t from-yellow-100 via-yellow-300 to-yellow-400 rounded-2xl px-10 py-10 h-full w-[100%] sm:w-[80%] md:w-[100%] text-center md:text-start">
        <h3 className="font-bold text-xl mb-6">Get in touch</h3>
        <div className="mb-5 flex flex-col gap-1">
          <h4 className="font-bold">Visit us</h4>
          <p>Come say hello to our office</p>
          <p className="font-semibold text-sm">
            Egypt, Cairo, Nasr City
          </p>
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <h4 className="font-bold">Chat with us</h4>
          <p>Our team is here to help</p>
          <a
            href="mailto:flavorfiesta00@gmail.com"
            className="font-semibold text-sm"
          >
            flavorfiesta00@gmail.com
          </a>
        </div>
        <div className="mb-5 flex flex-col gap-1">
          <h4 className="font-bold">Call us</h4>
          <p>Mon-Fri from 9am to 6pm</p>
          <a
            href="tel:+21065673054"
            className="font-semibold text-sm"
          >
            +21065673054
          </a>
        </div>
        <div className="mb-5 flex flex-col gap-3">
          <h4 className="font-bold">Social media</h4>
          <ul className="flex justify-center md:justify-start gap-4 text-xl">
            <motion.li
              className="hover:text-gray-500"
              whileHover={{ y: -4 }}
            >
              <a href="https://github.com/AhmedEweesKorany/Flavor_Fiesta" target="__blank">
                <AiFillGithub />
              </a>
            </motion.li>
            <motion.li
              className="rounded-full hover:text-blue-400"
              whileHover={{ y: -4 }}
            >
              <a href="#">
                <AiFillTwitterCircle />
              </a>
            </motion.li>
            <motion.li
              className="rounded-full hover:text-blue-600"
              whileHover={{ y: -4 }}
            >
              <a href="#">
                <AiFillLinkedin />
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
      {/* Contact form container */}
      <div className="basis-1/2 lg:basis-1/4 m-auto flex flex-col">
        {/* Contact form container details */}
        <div className="mb-8 flex flex-col gap-3">
          <h2 className="font-bold text-3xl">We'd love to help</h2>
          <p className="text-sm">
            Reach out and we'll get in touch in 24 hours
          </p>
        </div>
        {/* Contact form */}
        <form
          className="flex flex-col gap-4"
          action={"https://formspree.io/f/mnqevwjy"}
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row">
            <Input
              type={"text"}
              id={"firstName"}
              icon={<AiOutlineUser />}
              handleChange={handleChange}
              value={formDetails.firstName}
              label={"First Name"}
              placeholder={"John"}
              errorMessage={
                ""
              }
              pattern={"^[a-zA-Z]{3,}(?: [a-zA-Z]{3,})*$"}
            />
            <Input
              type={"text"}
              id={"lastName"}
              icon={<AiOutlineUser />}
              handleChange={handleChange}
              value={formDetails.lastName}
              label={"Last Name"}
              placeholder={"Doe"}
              errorMessage={
                ""
              }
              pattern={"^[a-zA-Z]{3,}(?: [a-zA-Z]{3,})*$"}
            />
          </div>
          <Input
            type={"email"}
            id={"email"}
            icon={<IoMailOutline />}
            handleChange={handleChange}
            value={formDetails.email}
            label={"Email"}
            placeholder={"example@abc.com"}
            errorMessage={""}
            pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/}
          />
          <div className="flex flex-col relative ">
            <label
              htmlFor="message"
              className="text-sm font-semibold mb-3"
            >
              Message
            </label>
            <textarea
              onChange={handleChange}
              value={formDetails.message}
              id="message"
              name="message"
              rows={6}
              onBlur={handleFocus}
              focused={focused.toString()}
              aria-required="true"
              aria-describedby="message-error"
              placeholder="Leave us a message"
              className="py-2 px-4 border bg-gray-100 rounded-lg focus:outline outline-primary"
              pattern={/^.{10,}$/}
            />
          </div>
          <Button
            content={"Send message"}
            icon={<FaRegPaperPlane />}
            type={"submit"}
            customCss={"rounded-lg gap-3"}
          />
            <Toaster
            position="right-bottom"
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

export default Contact;
