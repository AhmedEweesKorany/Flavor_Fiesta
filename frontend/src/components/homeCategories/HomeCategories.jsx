import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./style.css";
import SwiperCore from "swiper";
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { RateReview } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
SwiperCore.use([Autoplay]);
export default function HomeCategories() {
  const [data, setData] = useState([]);

  async function getData() {
    await fetch("http://localhost:3010/limitedRecipes")
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{ delay: 3000 }}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {data.map((w) => {
          return (
            <>
              <SwiperSlide key={w.recipes_id}>
                <Link to={`/recipe/${w.recipes_id}`}>
                <img src={w.recipes_image} />
                </Link>
                <p className="slider-p">{w.recipes_title}</p>
              <div className="rating">
              <span className="slider-span">{w.recipes_rate}</span>
                <Rating readOnly value={+w.recipes_rate} className="imgrate" />
              </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </>
  );
}
