import React, { useRef, useState } from "react";
import { FaCog, FaDownload, FaPlus } from "react-icons/fa";
import Banner from "../../assets/banner.png";
import plus from "../../assets/plus.png";
import pen from "../../assets/pen.png";
import coin from "../../assets/coin.png";
import imageIcon from "../../assets/esp.png";
import vector from "../../assets/Vector.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setResultImages } from "../Features/Generate/generateSlice";

export default function TextileImageGen() {
  const [selectedTab, setSelectedTab] = useState("generate");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const designType = useSelector((state) => state.textile.designType);
  const complexity = useSelector((state) => state.textile.complexity);
  const numImages = useSelector((state) => state.textile.numImages);
  const shade = useSelector((state) => state.textile.shade);
  console.log(designType);
  console.log(complexity);
  console.log(numImages);
  console.log(shade);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedEditImage, setSelectedEditImage] = useState(null);
  const Coins = useSelector((state) => state?.plan?.selectedPlan);
  console.log(Coins?.managerWallet?.coins);

  const [selectedImage, setSelectedImage] = useState(null);
  const formRef = useRef(null);
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setPrompt("");
    setResult(null);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  console.log(selectedFile);
  const uploadImage = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        "https://inventorymanagement-backend-trzq.onrender.com/api/upload/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json(); // ✅ Assuming JSON response
      console.log("Upload successful, JSON response:", data);
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");

    if (
      (selectedTab === "generate" || selectedTab === "edit") &&
      prompt.trim() === ""
    ) {
      setErrorMsg("Prompt is required.");
      return;
    }

    if (selectedTab === "convert" && !selectedFile) {
      setErrorMsg("Please upload an image to convert.");
      return;
    }

    setLoading(true);
    setPrompt("");
    setSelectedEditImage("");

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let payload = {};

    try {
      if (selectedTab === "generate") {
        payload = {
          description: prompt,
          style: designType,
          color_info: shade,
          simplicity: String(complexity),
          n_options: String(numImages),
        };
      } else if (selectedTab === "edit") {
        if (!selectedEditImage && !selectedFile) {
          setErrorMsg("Please upload or select an image to edit.");
          setLoading(false);
          return;
        }

        const base64Image = selectedFile
          ? await toBase64(selectedFile)
          : selectedEditImage;

        payload = {
          description: prompt,
          image: base64Image,
        };
      } else if (selectedTab === "convert") {
        const uploaded = await uploadImage(); // now uploads the image
        if (!uploaded?.url) {
          setErrorMsg("Image upload failed.");
          setLoading(false);
          return;
        }

        payload = {
          image: uploaded.url, // use the URL returned from the backend
        };
      }

      let apiUrl = "";
      if (selectedTab === "generate") {
        apiUrl =
          "https://inventorymanagement-backend-dev.onrender.com/api/genImg/create-image";
      } else if (selectedTab === "edit") {
        apiUrl =
          "https://inventorymanagement-backend-dev.onrender.com/api/genImg/edit-image";
      } else if (selectedTab === "convert") {
        apiUrl =
          "https://inventorymanagement-backend-dev.onrender.com/api/genImg/convert_to_eps";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${selectedTab} image`);
      }

      const data = await response.json();
      console.log(`${selectedTab} success:`, data);
      const output = data?.data;

      let finalResult = [];

      if (Array.isArray(output?.cloudinary_urls)) {
        finalResult = output?.cloudinary_urls;
      } else if (typeof output?.filename === "string") {
        finalResult = [output?.filename]; // convert single image to array
      }
      console.log(finalResult);

      setResult(finalResult);
      console.log(result);
      dispatch(setResultImages(finalResult));
    } catch (error) {
      console.error(`${selectedTab} error:`, error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const FullScreenLoader = () => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCD8A8] text-gray-900 flex flex-col items-center px-4 py-10">
      {/* Top Banner */}
      {/* Banner or Generated Image Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {!result || result?.length === 0 ? (
          <>
            <div className="text-center pt-10 md:text-left space-y-4">
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

            <div className="w-full flex justify-center md:justify-end">
              <img
                src={Banner}
                alt="Illustration"
                className="w-[360px] sm:w-[400px] md:w-[480px] xl:w-[520px] pt-10 sm:pt-20"
              />
            </div>
          </>
        ) : (
          <div className="col-span-2   pt-10 min-h-110 w-full">
            {loading && (
              <div className="absolute top-10 inset-0 z-10 bg-orange-300/30 backdrop-blur-sm flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {Array?.isArray(result) && result?.length > 0 && (
              <>
                {selectedTab === "generate" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {result.slice(0, 10).map((imageUrl, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg text-center space-y-2">
                        <img
                          src={imageUrl}
                          alt={`Generated ${index}`}
                          onClick={() => setSelectedImage(imageUrl)}
                          className="w-full h-40 object-cover cursor-pointer rounded-md border"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center pt-6">
                    <div className="  px-4">
                      {selectedTab === "edit" ? (
                        <img
                          src={Array?.isArray(result) ? result[0] : result}
                          alt="Edited Result"
                          onClick={() =>
                            setSelectedImage(
                              Array.isArray(result) ? result[0] : result
                            )
                          }
                          className="w-full max-h-[400px] object-contain rounded-lg border cursor-pointer"
                        />
                      ) : selectedTab === "convert" ? (
                        <div className="text-center space-y-4">
                          <p className="text-lg font-semibold text-black">
                            EPS File Generated
                          </p>

                          <a
                            href={Array.isArray(result) ? result[0] : result}
                            download
                            className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                            📎 Download EPS
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedTab === "generate" && (
              <div className="flex pt-4 justify-center">
                <button className="text-black text-[20px] py-2 bg-orange-300 rounded-lg cursor-pointer hover:bg-orange-400 px-6">
                  Generate Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Section */}
      <div
        className="w-full max-w-7xl mt-10"
        id="editFormSection"
        ref={formRef}>
        <div className="bg-gradient-to-r from-[#D88939] to-[#E9A751] p-5 rounded-xl shadow-lg space-y-4">
          {/* Tabs and Coins */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-2">
              {[
                { key: "generate", icon: plus, label: "Generate" },
                { key: "edit", icon: pen, label: "Edit With AI" },
                { key: "convert", icon: imageIcon, label: "Image to ESP" },
                ,
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={`px-4 py-2 flex items-center gap-2 rounded font-semibold cursor-pointer ${
                    selectedTab === tab.key
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}>
                  <img
                    src={tab.icon}
                    className={`w-5 h-5 ${
                      selectedTab === tab.key ? "invert" : ""
                    }`}
                    alt={tab.label}
                  />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              <div className="flex items-center bg-white px-4 py-1 rounded-l-lg border border-black">
                <img
                  src={coin}
                  alt="coin"
                  className="w-4 h-4 mr-2 filter brightness-0"
                />
                <span className="font-semibold text-black text-md">
                  {Coins?.managerWallet?.coins || Coins?.wallet?.coins}
                </span>
              </div>
              <button className="bg-black px-3 py-2 rounded-r-lg flex items-center justify-center border border-black border-l-0">
                <FaPlus className="text-white text-sm" />
              </button>
              {selectedTab === "generate" && (
                <button className="p-2 rounded-xl bg-black hover:bg-gray-800 transition">
                  <Link to="/textileai">
                    <FaCog className="text-orange-400 text-lg" />
                  </Link>
                </button>
              )}
            </div>
          </div>

          {/* Prompt Input and Upload */}
          <div className="flex flex-col sm:flex-row relative items-stretch gap-2 bg-white rounded-md overflow-hidden p-1">
            {/* Prompt input - only for generate and edit */}
            {(selectedTab === "generate" || selectedTab === "edit") && (
              <div className="relative w-full">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    selectedTab === "generate"
                      ? "Enter prompt to generate design"
                      : "Enter prompt to edit design"
                  }
                  className={`w-full px-4 py-2 outline-none text-sm sm:text-base pr-36 ${
                    errorMsg && !prompt ? "border border-red-500" : ""
                  }`}
                />

                {/* Show uploaded image link (for edit mode) */}
                {selectedEditImage && (
                  <a
                    href={selectedEditImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-8 top-3 text-xs text-blue-600 underline truncate max-w-[140px]">
                    📎 {selectedEditImage}
                  </a>
                )}
              </div>
            )}

            {/* File Upload */}
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={handleFileChange}
              className={`${
                selectedTab === "generate" || selectedTab === "edit"
                  ? "w-auto"
                  : "w-full"
              }`}
            />

            <label htmlFor="fileUpload">
              <img
                src={vector}
                className="absolute top-3 right-44 cursor-pointer"
                alt="Upload Icon"
              />
            </label>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`${
                loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400"
              } sm:w-44 w-full px-4 py-2 hover:bg-orange-500 rounded-lg cursor-pointer text-white font-semibold flex justify-center items-center gap-2`}>
              {loading
                ? "Processing..."
                : selectedTab === "generate"
                ? "Generate"
                : selectedTab === "edit"
                ? "Edit"
                : "Convert"}

              <span className="text-white px-1 rounded-full text-md">
                {selectedTab === "generate" ? numImages : "1"}
              </span>

              <img src={coin} className="w-4 h-4" />
            </button>
          </div>

          {/* Error message display */}
          {errorMsg && (
            <p className="text-red-600 text-sm mt-2 ml-1 font-medium">
              {errorMsg}
            </p>
          )}

          {/* Show Generated Result */}
        </div>
      </div>

      {/* Modal Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-orange-300 bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-[-10px] right-[-2px]   text-gray-600 hover:text-black text-3xl">
              ×
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-md  mb-4"
            />
            <div className="flex justify-center gap-4">
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  setSelectedTab("edit");
                  setResult("");
                  setSelectedEditImage(selectedImage);
                  setSelectedImage(null);
                  setTimeout(() => {
                    const el = document.getElementById("editFormSection");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 300);
                }}>
                Edit
              </button>

              <button
                onClick={async () => {
                  const response = await fetch(selectedImage);
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "design.png";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                }}
                className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
