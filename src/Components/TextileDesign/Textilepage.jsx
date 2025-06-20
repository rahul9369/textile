import React, { useState } from "react";
import { FaCog, FaMinus, FaPlus } from "react-icons/fa";
import Banner from "../../assets/banner.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTextileParameters } from "../../features/textiles/textilesSlice";
// import { setTextileParameters } from "../Features/Textiles/textilesSlice";
export default function TextileDesignPage() {
  const [designType, setDesignType] = useState("standalone");
  const [complexity, setComplexity] = useState(3);
  const [numImages, setNumImages] = useState(4);
  const [shade, setShade] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveParameters = async () => {
    setLoading(true);
    navigate("/textile");

    const payload = {
      designType,
      complexity,
      numImages,
      shade,
    };

    dispatch(setTextileParameters(payload));
    console.log("Saved to Redux:", payload);

    setLoading(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FCD8A8] text-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        {/* Text Section */}
        <div className="text-center sm:pt-10 pt-16 md:text-left space-y-4">
          {/* Desktop Heading */}
          <h1 className="hidden md:block text-5xl font-bold leading-tight">
            Bring Textile <br />
            Designs to Life
          </h1>

          {/* Mobile Heading */}
          <h1 className="block md:hidden text-2xl font-bold leading-tight">
            Bring Textile Designs to Life
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg text-gray-800">
            With AI-Powered Image Generation <br />
            Customized for Textile Designs
          </p>
        </div>

        {/* Banner */}
        <div className="flex justify-center">
          <img
            src={Banner}
            alt="Illustration"
            className="w-[320px] sm:w-[400px] md:w-[480px] xl:w-[520px] pt-4 sm:pt-10"
          />
        </div>
      </div>

      {/* Parameters Section */}
      <div className="w-full max-w-6xl p-6 rounded-2xl shadow-lg space-y-6 relative border border-black bg-gradient-to-r sm:bg-gradient-to-l from-[#FBDBB5] to-[#DB9245]">
        <Link
          to="/textile"
          className="absolute top-4 right-4 p-2 rounded-md bg-black">
          <FaCog className="text-[#F7941D] text-lg" />
        </Link>

        <h2 className="font-bold text-sm sm:text-xl text-black">
          Set Image Generation Parameters
        </h2>

        {/* Design Type */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2 bg-white rounded-md p-1 w-full sm:w-auto">
            <button
              onClick={() => setDesignType("standalone")}
              className={`px-4 py-1 rounded-md cursor-pointer font-semibold transition ${
                designType === "standalone"
                  ? "bg-black text-white"
                  : "text-black"
              }`}>
              Standalone
            </button>
            <button
              onClick={() => setDesignType("pattern")}
              className={`px-4 py-1 rounded-md cursor-pointer font-semibold transition ${
                designType === "pattern" ? "bg-black text-white" : "text-black"
              }`}>
              Pattern
            </button>
          </div>

          {/* Shade input for desktop view */}
          <div className="hidden sm:block flex-1 max-w-[400px]">
            <input
              type="text"
              placeholder="Enter Colour / Shade Preference"
              value={shade}
              onChange={(e) => setShade(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-sm outline-none border border-black"
            />
          </div>
        </div>

        {/* Complexity + Images */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Complexity */}
          <div className="flex items-center  gap-2 bg-black text-white px-4 py-2 rounded-md w-full sm:w-auto">
            <span className="mr-4 text-sm sm:text-base">Complexity</span>
            <div className="bg-white rounded-md py-1 w-50">
              <button
                onClick={() => setComplexity((prev) => Math.max(1, prev - 1))}
                disabled={complexity === 1}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaMinus size={12} />
              </button>
              <span className="text-black px-12 py-0.5 font-semibold">
                {complexity}
              </span>
              <button
                onClick={() => setComplexity((prev) => Math.min(10, prev + 1))}
                disabled={complexity === 10}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Number of Images */}
          <div className="flex items-center gap-2 bg-black text-white px-2 py-2 rounded-md w-full sm:w-auto">
            <span className="mr-1 text-sm sm:text-base">No. of Images</span>
            <div className="bg-white py-1 rounded-md w-44">
              <button
                onClick={() => setNumImages((prev) => Math.max(1, prev - 1))}
                disabled={numImages === 1}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaMinus size={12} />
              </button>
              <span className="text-black px-11 py-0.5 font-semibold">
                {numImages}
              </span>
              <button
                onClick={() => setNumImages((prev) => Math.min(10, prev + 1))}
                disabled={numImages === 10}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaPlus size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Shade input for mobile view (placed above save button) */}
        <div className="flex sm:hidden w-full sm:w-auto">
          <input
            type="text"
            placeholder="Enter Colour / Shade Preference"
            value={shade}
            onChange={(e) => setShade(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white text-sm outline-none border border-black"
          />
        </div>

        {/* Save Parameters Button */}
        <div className="flex">
          <button
            onClick={handleSaveParameters}
            disabled={loading}
            className="ml-auto bg-[#F7941D] hover:bg-orange-500 cursor-pointer text-white font-semibold px-5 py-2 rounded-md transition w-full sm:w-auto">
            {loading ? "Saving..." : "Save Parameters"}
          </button>
        </div>

        {/* Response Display */}
        {response && (
          <div className="text-sm text-black">
            ✅ Parameters Saved: {JSON.stringify(response)}
          </div>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <p className="text-xs text-center sm:text-right text-[#6C6C6C] mt-2">
          Per Image Generation Costs 1 CC
        </p>
      </div>
    </div>
  );
}
