import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loginStep, setLoginStep] = useState("form");
  const [resetStep, setResetStep] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupSuccess(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    if (!password.trim()) errs.password = "Password is required";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    navigate("/");
  };

  const resetToLogin = () => {
    navigate("/");
    setActiveTab("login");
    setSignupSuccess(false);
    setLoginStep("form");
    setResetStep("");
    setFormData({ email: "", password: "", otp: "", confirmPassword: "" });
    setErrors({});
  };

  const handleResetClick = () => {
    setResetStep("otp");
    setLoginStep("");
    setErrors({});
  };

  const handleResetOtpSubmit = (e) => {
    e.preventDefault();
    if (!/\d{6}/.test(formData.otp)) {
      setErrors({ otp: "Enter valid 6-digit OTP" });
      return;
    }
    setErrors({});
    setResetStep("newPassword");
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    const errs = {};
    if (password.length < 6) errs.password = "Minimum 6 characters required";
    if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setResetStep("done");
  };

  const inputStyle =
    "w-full px-4 py-3 bg-[#FBDBB5] rounded-md border border-gray-400 placeholder-gray-600";

  return (
    <div className="min-h-screen bg-[#FBDBB5] flex items-center justify-center px-2">
      <div className="w-full max-w-3xl bg-[#d87f35] p-4 rounded-[30px] shadow-lg max-h-[450px] flex items-center justify-center">
        <div className="w-full max-w-2xl h-[330px] flex flex-col">
          <div className="flex justify-evenly mb-4">
            <button
              onClick={() => {
                setActiveTab("login");
                setSignupSuccess(false);
                setLoginStep("form");
                setResetStep("");
                setErrors({});
              }}
              className={`text-2xl cursor-pointer font-semibold ${
                activeTab === "login"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}>
              LogIn
            </button>
            <button
              onClick={() => {
                setActiveTab("signup");
                setSignupSuccess(false);
                setLoginStep("");
                setResetStep("");
                setFormData({
                  email: "",
                  password: "",
                  otp: "",
                  confirmPassword: "",
                });
                setErrors({});
              }}
              className={`text-2xl font-semibold cursor-pointer ${
                activeTab === "signup"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}>
              Sign Up
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {loginStep === "success" && (
              <div className="flex flex-col items-center justify-center space-y-6 py-4">
                <FaCheckCircle size={60} className="text-white" />
                <p className="text-white text-xl font-semibold text-center">
                  You Have Logged In Successfully
                </p>
                <button
                  onClick={resetToLogin}
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Back to LogIn
                </button>
              </div>
            )}

            {!signupSuccess &&
              activeTab === "login" &&
              resetStep === "" &&
              loginStep === "form" && (
                <form onSubmit={handleLoginSubmit} className="space-y-4 pt-10">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Registered Email ID"
                    className={inputStyle}
                  />
                  {errors.email && (
                    <p className="text-red-200 text-sm">{errors.email}</p>
                  )}

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    className={inputStyle}
                  />
                  {errors.password && (
                    <p className="text-red-200 text-sm">{errors.password}</p>
                  )}

                  <div className="flex justify-end text-sm text-white  font-medium">
                    <button
                      onClick={handleResetClick}
                      className="cursor-pointer"
                      type="button">
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#202020] text-white font-semibold py-3 cursor-pointer rounded-md">
                    Log In
                  </button>
                </form>
              )}

            {signupSuccess && (
              <div className="flex flex-col items-center justify-center pt-10 space-y-2 py-4">
                <FaCheckCircle size={60} className="text-white" />
                <p className="text-white text-xl font-semibold text-center">
                  Your Account Has Been Sent For Verification
                </p>
                <p className="text-white text-center">
                  Officials From Claw Legaltech Will Contact You For
                  Verification Process
                </p>
                <button
                  onClick={resetToLogin}
                  className="w-full bg-[#202020] mt-8 text-white font-semibold py-3 cursor-pointer rounded-md">
                  Go Back to Website
                </button>
              </div>
            )}

            {!signupSuccess && activeTab === "signup" && (
              <form
                onSubmit={handleSignup}
                className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className={`col-span-2 ${inputStyle}`}
                  required
                />
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  className={inputStyle}
                  required
                />
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className={inputStyle}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  className={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Enter Company GST"
                  className={inputStyle}
                />
                <div className="col-span-2 text-sm text-white">
                  By Clicking “Create Account” you agree to Claw Legaltech’s
                  Terms and Conditions and
                  <span className="font-semibold text-black cursor-pointer">
                    {" "}
                    Privacy Policy
                  </span>
                </div>
                <button
                  type="submit"
                  className="col-span-2 w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md mt-2">
                  Create Account
                </button>
              </form>
            )}

            {resetStep === "otp" && (
              <form
                onSubmit={handleResetOtpSubmit}
                className="space-y-4 pt-10 ">
                <label className="text-white text-center text-lg font-medium block">
                  Reset Password
                </label>
                <p className="text-center pt-0 text-white">
                  An OTP has been sent to your registered email ID
                </p>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className={inputStyle}
                />
                {errors.otp && (
                  <p className="text-red-200 text-sm">{errors.otp}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Verify OTP
                </button>
              </form>
            )}

            {resetStep === "newPassword" && (
              <form
                onSubmit={handleChangePasswordSubmit}
                className="space-y-3 ">
                <p className="text-white text-center font-bold">
                  Reset Password
                </p>
                <p className="text-white text-center">
                  Create a New Password and Attempt to Sign In
                </p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter New Password"
                  className={inputStyle}
                />
                {errors.password && (
                  <p className="text-red-200 text-sm">{errors.password}</p>
                )}
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter New Password"
                  className={inputStyle}
                />
                {errors.confirmPassword && (
                  <p className="text-red-200 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Reset Password
                </button>
              </form>
            )}

            {resetStep === "done" && (
              <div className="flex flex-col items-center justify-center pt-16 space-y-6 py-4">
                <FaCheckCircle size={60} className="text-white" />
                <p className="text-white text-xl font-semibold text-center">
                  Your Password Has Been Reset Successfully
                </p>
                <button
                  onClick={resetToLogin}
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
