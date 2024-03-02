import React, {useState, useEffect} from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Button } from "..";
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
//images 
import food1 from "./food1.webp"
import food4 from "./food4.jpg"
import food6 from "./food6.jpg"
import food2 from "./food2.jpg"
import food3 from "./food3.jpg"

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesanim = [
    food1, food6, food4, food2, food3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesanim.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="box h-[82vh] flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-16">
      <div className="flex flex-col items-center md:items-start justify-center basis-1/2 gap-4">
        <span className="text-primary text-sm px-4 py-1 rounded-full border-2 border-primary max-w-max">
          Feast. Share. Connect.
        </span>
        <h2 className="font-bold text-3xl md:text-5xl text-center md:text-start">
          Welcome to <span className="text-primary">Flavor Fiesta</span>
        </h2>
        <p className="text-gray-600 text-center md:text-start">
        <TypeAnimation
      sequence={[
        'Your Way To Unleash your cooking hand',
        1000, 
        'Communicate With Chiefs and Others',
        1000,
        'Add Your Sepcial Recipe',
        1000,
        'Review Recipes ',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
        </p>
        <Link to={"/recipe"}>
          <Button
            content={"Explore Recipes"}
            customCss={
              "mt-4 md:mt-8 md:py-3 md:px-9 md:text-lg max-w-max rounded-full"
            }
            icon={<GiKnifeFork />}
          />
        </Link>
      </div>
      <div className="basis-1/2 bg-no-repeat bg-cover bg-center rounded-xl"
      style={{ backgroundImage: url(`${imagesanim[currentImageIndex]}`) }} >
        
      </div>
    </section>
  );
};

export default Hero;