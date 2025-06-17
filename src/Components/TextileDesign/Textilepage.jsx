import React, { useState } from "react";
import { FaCog, FaMinus, FaPlus } from "react-icons/fa";
import Banner from "../../assets/banner.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TextileDesignPage() {
  const [designType, setDesignType] = useState("standalone");
  const [complexity, setComplexity] = useState(3);
  const [numImages, setNumImages] = useState(4);
  const [shade, setShade] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("https://your-api-endpoint.com/generate", {
        designType,
        complexity,
        numImages,
        shade,
      });

      setResponse(res.data); // Assume API returns data like image URLs
    } catch (err) {
      console.error(err);
      setError("Failed to generate images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCD8A8] text-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        {/* Text Section */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight pt-10 sm:pt-0">
            Bring Textile <br /> Designs to Life
          </h1>
          <p className="text-base md:text-lg text-gray-800">
            With AI-Powered Image Generation <br /> Customized for Textile
            Designs
          </p>
        </div>

        {/* Banner */}
        <div className="flex justify-center">
          <img
            src={Banner}
            alt="Illustration"
            className="w-[320px] sm:w-[400px] md:w-[480px] xl:w-[520px] pt-10"
          />
        </div>
      </div>

      {/* Parameters Section */}
      <div className="w-full max-w-6xl bg-[#F9D9B5] p-6 rounded-2xl shadow-lg space-y-6 relative border border-black">
        <Link
          to="/textile"
          className="absolute top-4 right-4 p-2 rounded-md bg-black">
          <FaCog className="text-[#F7941D] text-lg" />
        </Link>

        <h2 className="font-bold text-sm sm:text-xl text-black">
          Set Image Generation Parameters
        </h2>

        {/* Design Type + Shade */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2 bg-white rounded-md p-1">
            <button
              onClick={() => setDesignType("standalone")}
              className={`px-4 py-1 rounded-md font-semibold transition ${
                designType === "standalone"
                  ? "bg-black text-white"
                  : "text-black"
              }`}>
              Standalone
            </button>
            <button
              onClick={() => setDesignType("pattern")}
              className={`px-4 py-1 rounded-md font-semibold transition ${
                designType === "pattern" ? "bg-black text-white" : "text-black"
              }`}>
              Pattern
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter Colour / Shade Preference"
            value={shade}
            onChange={(e) => setShade(e.target.value)}
            className="flex-1 max-w-[400px] px-4 py-2 rounded-md bg-white text-sm outline-none border border-black"
          />
        </div>

        {/* Complexity + Images + Save */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Complexity */}
          <div className="flex items-center w-76 gap-2 bg-black text-white px-4 py-2 rounded-md">
            <span className="mr-5">Complexity</span>
            <div className="bg-white rounded-md py-1 w-50">
              <button
                onClick={() => setComplexity((prev) => Math.max(1, prev - 1))}
                className="text-black px-2 py-1 font-bold hover:bg-gray-200">
                <FaMinus size={12} />
              </button>
              <span className="text-black px-12 py-0.5 font-semibold">
                {complexity}
              </span>
              <button
                onClick={() => setComplexity((prev) => prev + 1)}
                className="text-black px-2 py-1 font-bold hover:bg-gray-200">
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Number of Images */}
          <div className="flex items-center w-76 gap-2 bg-black text-white px-2 py-2 rounded-md">
            <span className="mr-1">No. of Images</span>
            <div className="bg-white py-1 rounded-md w-44">
              <button
                onClick={() => setNumImages((prev) => Math.max(1, prev - 1))}
                className="text-black px-2 py-1 font-bold hover:bg-gray-200">
                <FaMinus size={12} />
              </button>
              <span className="text-black px-11 py-0.5 font-semibold">
                {numImages}
              </span>
              <button
                onClick={() => setNumImages((prev) => prev + 1)}
                className="text-black px-2 py-1 font-bold hover:bg-gray-200">
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Generate Images */}
          <button
            onClick={handleGenerateImages}
            disabled={loading}
            className="ml-auto bg-[#F7941D] hover:bg-[#e1871a] text-white font-semibold px-5 py-2 rounded-md transition">
            {loading ? "Generating..." : "Generate Images"}
          </button>
        </div>

        {/* Response Display */}
        {response && (
          <div className="text-sm text-black">
            ✅ Images Generated: {JSON.stringify(response)}
          </div>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <p className="text-xs text-right text-black mt-2">
          Per Image Generation Costs 1 OC
        </p>
      </div>
    </div>
  );
}
