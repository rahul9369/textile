import React from "react";
import { motion } from "framer-motion";
import Img from "../assets/phoneimg.png";
import Logo from "../assets/logo.png";
import textImg from "../assets/text.png";
import frame from "../assets/Frame.png";
import alrts from "../assets/alrts.png";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import download from "../assets/Group.png";

function AnimatedCounter({ value, duration = 2000, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const end = typeof value === "number" ? value : parseInt(value);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };

    requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return typeof value === "string" && value.includes("L")
    ? `${count}L+`
    : `${count}%`;
}

export default function TextileLandingPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="min-h-screen pt-20 sm:pt-0 bg-[linear-gradient(77.05deg,_#DB9245_2.55%,_#FBDBB5_97.45%)] text-gray-900 px-4 md:px-10  flex flex-col-reverse md:flex-row items-center justify-between relative ">
      {/* Left Content */}
      <div className="w-full md:w-1/2">
        <div className="w-full md:w-[90%] mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <p className="text-xl sm:text-5xl md:text-5xl font-bold text-black ">
              From Thread to Triumph
            </p>
            <p className="text-lg sm:text-4xl text-gray-800 mt-2">
              Automate Your Textile Business
            </p>
          </motion.div>

          <motion.p
            className="pt-10 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}>
            The Only App You'll Ever Need To{" "}
            <strong>
              Manage
              <br /> Firms, Orders, Inventory,
            </strong>{" "}
            And <strong>Textile Design</strong>.
          </motion.p>

          <div
            ref={ref}
            className="flex flex-wrap gap-4 justify-center md:justify-start">
            {[
              { value: 98, label: "User Satisfaction Rate" },
              { value: 25, label: "Faster Order Processing" },
              { value: "5L", label: "Meters of Fabrics Managed" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-orange-200 shadow rounded-lg p-4   w-40">
                <p className="text-2xl font-bold font-anton text-orange-500">
                  <AnimatedCounter value={stat.value} isVisible={inView} />
                </p>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <motion.div
            className="flex flex-col  sm:flex-row gap-4 mt-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}>
            <Link
              to="/signin"
              className=" w-60 hover:bg-gray-100 hover:text-black text-white px-6 py-2 rounded-full border border-white text-center">
              Get Started
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.fabriqs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white flex items-center gap-2 text-orange-300 w-60 justify-center border border-orange-500 px-6 py-2 rounded-full shadow text-center">
              <img src={download} className="w-5 h-5" alt="Download Icon" />
              <span className="text-sm font-semibold">Download Now</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Right Image and Popups */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}>
        <img
          src={Img}
          alt="App Screenshot"
          className="w-[90%] sm:w-[70%] md:w-full max-w-[400px] xl:max-w-[680px] h-auto rounded-xl"
        />

        {/* Top Left Popup */}
        <motion.div
          className="absolute top-[12%] left-[-11%] w-[280px] sm:w-[260px] md:w-[300px] h-auto rounded-lg flex items-center justify-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}>
          <img
            src={textImg}
            className="h-24 sm:h-28 md:h-32 w-full object-contain"
            alt="Text Popup"
          />
        </motion.div>

        {/* Top Right Popup */}
        <motion.div
          className="absolute top-[30%] right-[2%] w-[280px] sm:w-[260px] md:w-[300px] h-auto rounded-lg flex items-center justify-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}>
          <img
            src={alrts}
            className="h-24 sm:h-28 md:h-32 w-full object-contain"
            alt="Alert Popup"
          />
        </motion.div>

        {/* Bottom Left Popup */}
        <motion.div
          className="absolute bottom-[8%] left-[2%] w-[280px] sm:w-[260px] md:w-[300px] h-auto rounded-lg flex items-center justify-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}>
          <img
            src={frame}
            className="h-24 sm:h-28 md:h-32 w-full object-contain"
            alt="Frame Popup"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
