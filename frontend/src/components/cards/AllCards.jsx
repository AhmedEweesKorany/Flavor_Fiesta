import React, { useEffect, useState } from "react";
import { NoData, SingleCard } from "..";

const index = ({ mainTitle, tagline, type }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  async function getData() {
    fetch("http://localhost:3010/recipes")
      .then((data) => data.json())
      .then((res) => {
        setData(res.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="box flex flex-col items-center">
      <div className="flex flex-col items-center gap-5 w-full mb-10">
        {/* Main heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-start">
          {mainTitle}
        </h2>
        {/* Subtitle */}
        <p className="text-center">{tagline}</p>
        {/* Search */}
        <div className="border-gray-200 border-2 flex p-1 pl-4 rounded-lg mt-4 w-[80%] sm:w-[50%] md:w-[30%]">
          <input
            type="text"
            value={searchTerm}
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none w-full py-2"
            placeholder={`Search ${type}...`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        {/* Sub heading */}
        <h3 className="font-bold text-xl w-full">Recent {type}s</h3>
        {/* Cards container */}
        {data.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {data?.map((singleData) => (
              <SingleCard
                key={singleData._id}
                singleData={singleData}
                type={type}
              />
            ))}
          </div>
        ) : (
          <NoData text={"Data"} />
        )}
      </div>
    </section>
  );
};

export default index;
