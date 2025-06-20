import React from "react";
import { motion } from "framer-motion";
import Aimagic from "../assets/aimagic.png";
import drop from "../assets/drop.png";
import grid from "../assets/grid.png";
import pen from "../assets/pen.png";
import plus from "../assets/plus.png";
import star from "../assets/star.png";
import { Link } from "react-router-dom";

export default function AiMagicSection() {
  return (
    <div className="bg-[linear-gradient(#FBDBB5_97.45%)] px-4 md:px-16 pt-2 pb-16 font-sans text-gray-900">
      <div className="bg-gradient-to-r rounded-xl p-5 pt-0 from-[#fdbb78] to-[#fda769]">
        {/* Main Container */}
        <div className="bg-gradient-to-r relative from-[#fdbb78] to-[#fda769] rounded-xl p-0 md:p-12 flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Mobile Image on top */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="block lg:hidden">
            <img
              src={Aimagic}
              alt="AI Magic"
              className="w-[320px] h-[450px] mx-auto rounded-xl drop-shadow-2xl"
            />
          </motion.div>

          {/* Desktop Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:w-1/3 absolute top-[1px] right-[20px] justify-center">
            <img
              src={Aimagic}
              alt="AI Magic"
              className="w-[260px] md:w-[400px] h-[400px] md:h-[550px] rounded-xl drop-shadow-2xl"
            />
          </motion.div>

          {/* Left Content */}
          <div className="lg:w-2/3 space-y-6 px-2">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left text-xl md:text-xl pt-4">
              Dive Into the Future with <br />
              <span className="text-white font-bold text-4xl md:text-5xl">
                AI Magic
              </span>
            </motion.h2>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
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
                  className="bg-[linear-gradient(#FBDBB5_97.45%)] flex rounded-md p-3 text-sm shadow-sm">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-6 h-6 mx-2 my-auto"
                  />
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="flex justify-center lg:justify-start pt-3">
              <button className="flex items-center gap-2 px-6 py-3 border text-white rounded-full hover:bg-[#292c33] transition">
                <img
                  src={star}
                  alt="star icon"
                  className="w-5 h-5 filter invert brightness-50"
                />
                Generate Now
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Accurate Design Conversion", value: "95%" },
                { label: "Recolour Accuracy", value: "98%" },
                { label: "Faster Pattern Creation", value: "3X" },
                { label: "Manual Work Reduced", value: "95%" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-orange-200 p-4 rounded-2xl shadow-lg text-center">
                  <div className="text-xl md:text-2xl font-bold">
                    {stat.value}
                  </div>
                  <p className="text-xs md:text-xl text-gray-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Statistics */}
      <div className="text-center mt-16">
        <h3 className="text-xl md:text-4xl font-bold mb-10">
          Tested & Loved by the Textile Community
        </h3>

        {/* Responsive grid */}
        <div className="grid grid-cols-3 gap-6 justify-center text-sm md:hidden">
          {[
            { value: "25%", label: "Faster Order Processing" },
            { value: "98%", label: "User Satisfaction" },
            { value: "40%", label: "Less Time Spent" },
          ].map((stat, idx) => (
            <div key={idx} className="w-full">
              <div className="text-xl font-bold text-orange-600">
                {stat.value}
              </div>
              <p className="mt-1 text-sm text-gray-800">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 justify-center text-sm md:hidden mt-6">
          {[
            { value: "1000+", label: "Designs Created" },
            { value: "5L+", label: "Mtr. of Fabric Managed" },
          ].map((stat, idx) => (
            <div key={idx} className="w-full">
              <div className="text-xl font-bold text-orange-600">
                {stat.value}
              </div>
              <p className="mt-1 text-sm text-gray-800">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Desktop view (unchanged) */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 text-base">
          {[
            { value: "25%", label: "Faster Order Processing" },
            { value: "98%", label: "User Satisfaction" },
            { value: "40%", label: "Less Time Spent" },
            { value: "1000+", label: "Designs Created" },
            { value: "5L+", label: "Mtr. of Fabric Managed" },
          ].map((stat, idx) => (
            <div key={idx} className="w-40 mx-auto">
              <div className="text-5xl font-bold text-orange-600">
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
