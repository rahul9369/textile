import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Img from "../assets/phoneimg.png";
import textImg from "../assets/text.png";
import frame from "../assets/Frame.png";
import alrts from "../assets/alrts.png";
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
    <div className="min-h-screen pt-20 sm:pt-0 bg-[linear-gradient(77.05deg,_#DB9245_2.55%,_#FBDBB5_97.45%)] text-gray-900 px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-between relative overflow-x-hidden">
      {/* Left Content */}
      <div className="w-full md:w-1/2 order-1 md:order-1">
        <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[22px] sm:text-[30px] md:text-5xl font-bold text-black leading-snug">
              From Thread to Triumph
            </p>
            <p className="text-[16px] sm:text-[24px] md:text-4xl text-gray-800 mt-1">
              Automate Your Textile Business
            </p>
          </motion.div>

          <motion.p
            className="pt-6 sm:pt-10 text-[14px] sm:text-base text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            The Only App You'll Ever Need To{" "}
            <strong>
              Manage <br className="block sm:hidden" />
              Firms, Orders, Inventory,
            </strong>{" "}
            And <strong>Textile Design</strong>.
          </motion.p>

          {/* Stats */}
          <div
            ref={ref}
            className="flex flex-wrap gap-4 justify-center sm:justify-start"
          >
            {[
              { value: 98, label: "User Satisfaction Rate" },
              { value: 98, label: "Faster Order Processing" },
              { value: "5L", label: "Meters of Fabrics Managed" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-orange-200 shadow rounded-lg p-3 w-[30%] sm:w-40 text-center"
              >
                <p className="text-2xl font-bold text-orange-500">
                  <AnimatedCounter value={stat.value} isVisible={inView} />
                </p>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-row gap-4 mt-4 justify-center sm:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              to="/signin"
              className="w-2/5 sm:w-60 text-white px-6 py-1 sm:py-2 rounded-full border border-white text-center bg-transparent hover:bg-white hover:text-black flex items-center justify-center"
            >
              Get Started
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.fabriqs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white flex items-center gap-2 text-orange-300 w-2/5 sm:w-60 justify-center border border-orange-500 px-6 py-1 sm:py-2 rounded-full shadow text-center"
            >
              <img src={download} className="w-5 h-5" alt="Download Icon" />
              <span className="text-sm font-semibold">Download Now</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Right Image and Popups */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0 order-2 md:order-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <img
          src={Img}
          alt="App Screenshot"
          className="w-[85%] sm:w-[75%] md:w-full max-w-[400px] xl:max-w-[680px] h-auto rounded-xl"
        />

        {/* Top Left Popup */}
        <motion.div
          className="absolute top-[7%] sm:top-[15%] left-[2%] sm:left-[-10%] w-[150px] sm:w-[200px] md:w-[240px]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={textImg}
            className="h-16 sm:h-24 md:h-28 w-full object-contain"
            alt="Text Popup"
          />
        </motion.div>

        {/* Top Right Popup */}
        <motion.div
          className="absolute top-[25%] right-[2%] sm:right-[2%] w-[150px] sm:w-[200px] md:w-[240px]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={alrts}
            className="h-16 sm:h-24 md:h-28 w-full object-contain"
            alt="Alert Popup"
          />
        </motion.div>

        {/* Bottom Left Popup */}
        <motion.div
          className="absolute bottom-[4%] left-[0%] sm:left-[2%] w-[150px] sm:w-[200px] md:w-[240px]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={frame}
            className="h-16 sm:h-24 md:h-28 w-full object-contain"
            alt="Frame Popup"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
