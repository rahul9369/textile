import React from "react";
import { motion } from "framer-motion";
import Aimagic from "../assets/aimagic.png";
import drop from "../assets/drop.png";
import grid from "../assets/grid.png";
import pen from "../assets/pen.png";
import plus from "../assets/plus.png";
import star from "../assets/star.png";

export default function AiMagicSection() {
  return (
    <div className="bg-[linear-gradient(#FBDBB5_97.45%)] px-4 md:px-16 pt-2 pb-16 font-sans text-gray-900">
      <div className="bg-gradient-to-r rounded-xl p-5 pt-0 from-[#fdbb78] to-[#fda769]">
        {/* Top Card Section */}
        <div className="bg-gradient-to-r relative from-[#fdbb78] to-[#fda769] rounded-xl p-6 md:p-12 flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Left Content */}

          <div className="lg:w-2/3 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-xl ">
              Dive Into the Future with <br />
              <span className="text-white font-bold text-5xl">AI Magic</span>
            </motion.h2>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  img: plus,
                  title: "Generate Magic",
                  desc: "Create textile designs from text",
                },
                {
                  img: drop,
                  title: "Colorify Instantly",
                  desc: "1-click trendy palette recolor",
                },
                {
                  img: pen,
                  title: "Edit with Precision",
                  desc: "Scale, crop, remix faster",
                },
                {
                  img: grid,
                  title: "Grid It. Print It",
                  desc: "Auto-generate repeat patterns",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[linear-gradient(#FBDBB5_97.45%)] flex justify-start rounded-md p-4 text-sm shadow-sm hover:shadow-md transition">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-8 my-auto h-8 mx-2 "
                  />
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
              <button
                className="flex items-center cursor-pointer gap-2 w-44 px-4 py-2 border borde-white  text-white rounded-full hover:bg-[#292c33]
 transition">
                <img
                  src={star}
                  alt="star icon"
                  className="w-5 h-5 filter invert brightness-50"
                />
                Generate Now
              </button>
            </div>
            <div className="flex  justify-around pt-4">
              {[
                { label: "Accurate Design Conversion", value: "95%" },
                { label: "Recolour Accuracy", value: "98%" },
                { label: "Faster Pattern Creation", value: "3X" },
                { label: "Manual Work Reduced", value: "95%" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-orange-200  p-4 w-48 rounded-2xl shadow-lg">
                  <div className="text-xl md:text-2xl font-bold">
                    {stat.value}
                  </div>
                  <p className="text-xs md:text-xl text-gray-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* 4 Stats */}
          </div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 absolute top-[1px] right-[20px] flex justify-center">
            <img
              src={Aimagic}
              alt="AI Magic"
              className="w-[260px] md:w-[400px] h-[400px] md:h-[550px] rounded-xl drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Community Statistics */}
      <div className="text-center mt-16">
        <h3 className="text-xl md:text-4xl font-bold mb-10">
          Tested & Loved by the Textile Community
        </h3>

        <div className="grid grid-cols-2 ml-20 sm:grid-cols-3 md:grid-cols-5 items-center   text-center text-sm md:text-base">
          {[
            { value: "25%", label: "Faster Order Processing" },
            { value: "98%", label: "User Satisfaction" },
            { value: "40%", label: "Less Time Spent" },
            { value: "1000+", label: "Designs Created" },
            { value: "5L+", label: "Mtr. of Fabric Managed" },
          ].map((stat, idx) => (
            <div key={idx} className="w-40">
              <div className="text-xl md:text-5xl font-bold text-orange-600">
                {stat.value}
              </div>
              <p className="mt-1 text-2xl text-gray-800">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
