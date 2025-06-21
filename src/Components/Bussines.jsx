import React from "react";
import { motion } from "framer-motion";
import Bussiness from "../assets/bussine.png";
import peoples from "../assets/peoples.png";
import map from "../assets/map.png";
import manage from "../assets/manage.png";
import star from "../assets/star.png";
import Pdf from "../assets/FABRIQS.pdf";
import download from "../assets/Group.png";
import learn from "../assets/learn.png";
import "./Bussines.css";


export default function BusinessDashboard() {
  return (
    <div className="business-page min-h-[120vh] relative bg-[linear-gradient(#FBDBB5_97.45%)] text-gray-900 font-sans">

      <div className="mx-auto">
        {/* Desktop View */}
        <div className="hidden md:block">
          {/* Header */}
          <div className="bg-[#292c33] h-80 ">
            <div className="grid w-[90%] grid-cols-2 pt-20">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-5xl font-semibold text-white text-center mb-10 px-4 md:px-20">
                Built to Empower Every <br /> Thread of Your Business
              </motion.h1>

              {/* Features */}
              <div className="grid grid-cols-1 absolute right-[120px] sm:grid-cols-2 md:grid-cols-2 gap-4 mb-5 cursor-pointer">
                {[
                  { img: manage, title: "Manage Multiple Firms", desc: "Seamlessly Switch Between Businesses From One Dashboard" },
                  { img: map, title: "All-in-One Dashboard", desc: "Control Panel To Track Orders, Users, Insights, And Trends" },
                  { img: peoples, title: "Expand & Manage Team", desc: "Add Sales Reps Who Can Take Orders From Anywhere" },
                  { img: star, title: "Powerful AI Labs", desc: "Instantly Generate, Colorify, And Format Textile Designs" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                    className="bg-[#fdbb78] p-5 w-68 rounded-lg shadow hover:shadow-lg transition-all">
                    <img src={item.img} />
                    <h2 className="font-bold text-lg mb-2">{item.title}</h2>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Section */}
          <div className="flex flex-col w-[90%] absolute bottom-[5px] mx-auto lg:flex-row items-center gap-10">
            <motion.img
              src={Bussiness}
              alt="Business Dashboard"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-[800px] max-w-full h-auto drop-shadow-xl rounded-xl"
            />
            <div className="mx-auto lg:w-1/2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl pt-20 md:text-4xl font-semibold mb-3">
                Every Second Counts
              </motion.h2>
              <p className="text-gray-700 mb-5 text-2xl">
                We Make Sure It Works for You
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-lg mb-6">
                <li>Track stock & auto-alerts via WhatsApp</li>
                <li>Smart filters to find anything (bale, design, lot no.)</li>
                <li>Place & track orders, invoices in seconds</li>
                <li>Monitor team, firms & stock – all in real time</li>
                <li>Assign Team, Take Orders</li>
              </ul>

              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://play.google.com/store/apps/details?id=com.fabriqs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff922d] text-white flex items-center gap-2 px-6 py-2 rounded-full hover:bg-[#e47c1c] transition text-sm">
                  <img src={download} alt="Download Icon" className="w-5 h-5 brightness-0 invert" />
                  <span>Download Now</span>
                </a>

                <a
                  href={Pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-40 border border-[#ff922d] text-[#ff922d] px-6 py-2 rounded-full hover:bg-orange-50 transition text-sm flex items-center justify-center gap-2">
                  <img src={learn} className="w-5 h-5" alt="Learn Icon" />
                  <span>Learn More</span>
                </a>
              </div>
            </div>
          </div>
        </div>


       {/* Mobile View */}
{/* Mobile View */}
<div className="block md:hidden">
  <div className="bg-[#292c33] pt-6 pb-36 flex flex-col items-center">
   <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-8">
     Built to Empower Every <br /> Thread of Your Business
  </h1>

   <div className="grid grid-cols-2 gap-3 px-3">
  {[
    { img: manage, title: "Manage Multiple Firms", desc: "Seamlessly Switch Between Businesses From One Dashboard" },
    { img: map, title: "All-in-One Dashboard", desc: "Control Panel To Track Orders, Users, Insights, And Trends" },
    { img: peoples, title: "Expand & Manage Team", desc: "Add Sales Reps Who Can Take Orders From Anywhere" },
    { img: star, title: "Powerful AI Labs", desc: "Instantly Generate, Colorify, And Format Textile Designs" },
  ].map((item, i) => (
    <div
      key={i}
      className="bg-[#fdbb78] rounded-lg shadow w-full p-2 flex flex-col"
    >
      <div className="flex items-start">
        <img src={item.img} className="w-10 h-10" alt={item.title} />
      </div>
      <div className="mt-2 text-left">
        <h2 className="font-bold text-xs mb-1 truncate">
          {item.title}
        </h2>
        <p className="text-[10px] leading-snug">
          {item.desc}
        </p>
      </div>
    </div>
  ))}
</div>


  </div>

  <div className="flex flex-col mt-4 px-4">
<motion.img
  src={Bussiness}
  alt="Business Dashboard"
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="w-[95vw] h-auto drop-shadow-xl rounded-xl mx-auto -mt-32 sm:w-[90vw] lg:w-[85vw]"
/>


    <h2 className="text-2xl font-semibold mb-3 text-left">Every Second Counts</h2>
    <p className="text-gray-700 mb-5 text-lg text-left">We Make Sure It Works for You</p>

    <ul className="list-disc list-inside space-y-2 text-sm mb-6 text-left">
      <li>Track stock & auto-alerts via WhatsApp</li>
      <li>Smart filters to find anything (bale, design, lot no.)</li>
      <li>Place & track orders, invoices in seconds</li>
      <li>Monitor team, firms & stock – all in real time</li>
      <li>Assign Team, Take Orders</li>
    </ul>

  <div className="flex flex-wrap justify-start gap-4">
  <a
    href="https://play.google.com/store/apps/details?id=com.fabriqs"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-[#ff922d] text-white flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:bg-[#e47c1c] transition text-sm flex-1 sm:flex-none"
  >
    <img src={download} alt="Download Icon" className="w-4 h-4 brightness-0 invert" />
    <span>Download Now</span>
  </a>

  <a
    href={Pdf}
    target="_blank"
    rel="noopener noreferrer"
    className="border border-[#ff922d] text-[#ff922d] flex items-center justify-center gap-2 px-4 py-2 rounded-full hover:bg-orange-50 transition text-sm flex-1 sm:flex-none"
  >
    <span>Learn More</span>
  </a>
</div>



  </div>
</div>



  </div>
    </div>
  );
}
