import React, { useState } from "react";
import { FaCog, FaDownload, FaPlus } from "react-icons/fa";
import Banner from "../../assets/banner.png";
import plus from "../../assets/plus.png";
import pen from "../../assets/pen.png";
import coin from "../../assets/coin.png";
import imageIcon from "../../assets/esp.png";
import axios from "axios";
import { Link } from "react-router-dom";
import vector from "../../assets/Vector.png";

export default function TextileImageGen() {
  const [selectedTab, setSelectedTab] = useState("generate");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // to store API result (optional)

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setPrompt(""); // clear prompt on tab switch
    setResult(null); // clear result
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt.");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/generate",
        {
          type: selectedTab,
          prompt: prompt.trim(),
        }
      );
      console.log("API Success:", response.data);
      setResult(response.data); // example: { imageUrl: "..." }
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCD8A8] text-gray-900 flex flex-col items-center px-4 py-10">
      {/* Top Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="text-center pt-10 sm:pt-0 md:text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Bring Textile <br />
            Designs to Life
          </h1>
          <p className="text-base sm:text-lg text-gray-800">
            With AI-Powered Image Generation <br />
            Customized for Textile Designs
          </p>
        </div>
        <div className="w-full flex justify-center md:justify-end">
          <img
            src={Banner}
            alt="Illustration"
            className="w-[320px] pt-20 sm:w-[400px] md:w-[480px] xl:w-[520px]"
          />
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-6xl mt-10">
        <div className="bg-gradient-to-r from-[#D88939] to-[#E9A751] p-5 rounded-xl shadow-lg space-y-4">
          {/* Top Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleTabClick("generate")}
                className={`px-4 py-2 flex items-center gap-2 rounded font-semibold cursor-pointer ${
                  selectedTab === "generate"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}>
                <img
                  src={plus}
                  className={`w-5 h-5 ${
                    selectedTab === "generate" ? "invert" : ""
                  }`}
                  alt="Generate Icon"
                />
                Generate
              </button>
              <button
                onClick={() => handleTabClick("edit")}
                className={`px-4 py-2 flex items-center gap-2 rounded font-semibold cursor-pointer ${
                  selectedTab === "edit"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}>
                <img
                  src={pen}
                  className={`w-5 h-5 ${
                    selectedTab === "edit" ? "invert" : ""
                  }`}
                  alt="Edit Icon"
                />
                Edit With AI
              </button>
              <button
                onClick={() => handleTabClick("imageToESP")}
                className={`px-4 py-2 flex items-center gap-2 rounded font-semibold cursor-pointer ${
                  selectedTab === "imageToESP"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}>
                <img
                  src={imageIcon}
                  className={`w-5 h-5 ${
                    selectedTab === "imageToESP" ? "invert" : ""
                  }`}
                  alt="Image to ESP"
                />
                Image to ESP
              </button>
            </div>

            {/* Coins, Add, Cog */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <div className="flex items-center bg-white px-4 py-1 rounded-l-lg border border-black">
                <img
                  src={coin}
                  alt="coin"
                  className="w-4 h-4 mr-2 filter brightness-0"
                />
                <span className="font-semibold text-black text-md">25693</span>
              </div>
              <button className="bg-black px-3 py-2 rounded-r-lg flex items-center justify-center border border-black border-l-0">
                <FaPlus className="text-white text-sm" />
              </button>
              <button className="p-2 rounded-xl bg-black hover:bg-gray-800 transition">
                <Link to="/textileai">
                  <FaCog className="text-orange-400 text-lg" />
                </Link>
              </button>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="flex flex-col sm:flex-row relative items-stretch gap-2 bg-white rounded-md overflow-hidden p-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                selectedTab === "generate"
                  ? "Enter prompt to generate design"
                  : selectedTab === "edit"
                  ? "Enter prompt to edit design"
                  : "Enter image prompt to convert to ESP"
              }
              className="w-full px-4 py-2 outline-none text-sm sm:text-base"
            />
            <img src={vector} className="absolute right-42 top-3 " />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`${
                loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400"
              } sm:w-44 w-full px-4 py-2 text-white font-semibold flex justify-center items-center gap-2`}>
              {loading
                ? "Processing..."
                : selectedTab === "generate"
                ? "Generate"
                : selectedTab === "edit"
                ? "Edit"
                : "Convert"}
              <span className="text-white px-1 rounded-full text-md">4</span>
              <img src={coin} className="w-4 h-4" />
            </button>
          </div>

          {/* Optional: Show Result */}
          {result?.imageUrl && (
            <div className="mt-4 text-center">
              <p className="font-semibold mb-2">Generated Image:</p>
              <img
                src={result.imageUrl}
                alt="Generated"
                className="max-w-full rounded-lg border border-black"
              />
              <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                <FaDownload />
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
