import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./features/auth/authSlice";
import { setSelectedPlan } from "./Features/plan/planSlice";

const AccountPage = () => {
  const currentUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customCoins, setCustomCoins] = useState(1000);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = ({ name, price, coins }) => {
    const options = {
      key: "rzp_test_UWcqHHktRV6hxM", // Your Razorpay Key
      amount: price * 100,
      currency: "INR",
      name: "FabrlQs AI",
      description: name,
      handler: async function (response) {
        try {
          console.log("Razorpay payment response:", response);
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: { name, price, coins },
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            dispatch(setSelectedPlan({ name, price, coins }));
            alert("Payment verified and plan activated!");
          } else {
            alert("Payment verification failed.");
          }
        } catch (error) {
          console.error("Verification error:", error);
          alert("Error verifying payment.");
        }
      },
      prefill: {
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        contact: currentUser?.phoneNumber || "",
      },
      theme: {
        color: "#DB9245",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#FCD9A4] px-4 py-6 sm:px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-row pt-20 justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Your Account
        </h1>
        <button
          onClick={handleLogout}
          className="bg-[#25262B] cursor-pointer text-white px-4 py-2 rounded-md hover:opacity-90">
          Log Out
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-[#DB9245] p-4 sm:p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-4">
            <input
              type="text"
              value={currentUser?.name}
              placeholder="Soumya Snigdha Banik"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
            <input
              type="email"
              value={currentUser?.email}
              placeholder="soumyabanik0@gmail.com"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
            <input
              type="text"
              value={currentUser?.phoneNumber}
              placeholder="+917384242486"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row w-full">
              <label className="bg-[#25262B] text-white text-sm px-3 py-2 sm:w-1/2 w-full flex items-center justify-center rounded-t-md sm:rounded-l-md sm:rounded-tr-none">
                Company Name
              </label>
              <input
                type="text"
                value={currentUser?.organizationName}
                placeholder="Soumya International Textiles"
                className="p-2 w-full sm:w-1/2 rounded-b-md sm:rounded-r-md sm:rounded-bl-none border border-gray-300 bg-[#FBDBB5]"
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <label className="bg-[#25262B] text-white text-sm px-3 py-2 sm:w-1/2 w-full flex items-center justify-center rounded-t-md sm:rounded-l-md sm:rounded-tr-none">
                Company GST Number
              </label>
              <input
                type="text"
                value={currentUser?.GSTNumber}
                placeholder="GESPB73655L"
                className="p-2 w-full sm:w-1/2 rounded-b-md sm:rounded-r-md sm:rounded-bl-none border border-gray-300 bg-[#FBDBB5]"
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <button className="bg-[#292C33] text-white px-4 py-2 rounded-md hover:opacity-90">
            Request Edit Details
          </button>
        </div>
      </div>

      {/* Wallet and Plans Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet */}
        <div className="bg-[#25262B] text-white p-6 rounded-md flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Your Wallet</h2>
          <p className="text-sm mb-1">Available Claw Coins</p>
          <p className="text-2xl font-bold text-white mb-4">4500</p>

          {/* Inner Add Claw Coins Box */}
          <div className="bg-[#DB9245] p-4 rounded-md">
            <label className="block text-sm text-black font-semibold mb-2">
              Add Claw Coins
            </label>
            <input
              type="number"
              placeholder="Enter No of Claw Coins"
              className="w-full p-2 rounded-md border border-gray-300 text-black mb-2 bg-[#FBDBB5]"
            />
            <div className="text-right text-sm text-black mb-2">
              Total Amount : <span className="font-bold">₹ 6599</span>
            </div>
            <button className="bg-[#25262B] text-white w-full py-2 rounded-md hover:opacity-90">
              Recharge Wallet
            </button>
          </div>
          <div className="w-full text-center text-xs text-white mt-2">
            Add On Can Be Only Used With An Active Plan
          </div>
        </div>

        {/* Pricing Cards - replace the two right-side divs with four cards */}
        <div className="lg:col-span-2 flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-left">
            AI Labs Pricing Plans
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
            {/* Starter Card */}
            <div className="bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-2 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full text-xs">
              <h3 className="font-bold text-lg mb-2 text-[#25262B]">
                FabrlQs Starter
              </h3>
              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ 1500
              </div>
              <p className="text-xs text-[#25262B] mb-2">
                Perfect for individuals and small teams exploring AI tools for
                the first time
              </p>
              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>250 Claw Coins</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                className="bg-[#DB9245] text-white font-semibold py-2 rounded-md mt-auto text-sm"
                onClick={() =>
                  handlePayment({
                    name: "FabrlQs Starter",
                    price: 1500,
                    coins: 250,
                  })
                }>
                Get It Now
              </button>
            </div>
            {/* Pro Card */}
            <div className="bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-2 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full text-xs">
              <h3 className="font-bold text-lg mb-2 text-[#25262B]">
                FabrlQs Pro
              </h3>
              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ 3000
              </div>
              <p className="text-xs text-[#25262B] mb-2">
                Perfect for individuals and small teams exploring AI tools for
                the first time
              </p>
              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>500 Claw Coins</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                onClick={() =>
                  handlePayment({
                    name: "FabrlQs Pro",
                    price: 3000,
                    coins: 500,
                  })
                }
                className="bg-[#DB9245] text-white font-semibold py-2 rounded-md mt-auto text-sm">
                Get It Now
              </button>
            </div>
            {/* Elite Card */}
            <div className="bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-2 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full text-xs">
              <h3 className="font-bold text-lg mb-2 text-[#25262B]">
                FabrlQs Elite
              </h3>
              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ 6000
              </div>
              <p className="text-xs text-[#25262B] mb-2">
                Perfect for individuals and small teams exploring AI tools for
                the first time
              </p>
              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>1000 Claw Coins</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                onClick={() =>
                  handlePayment({
                    name: "FabrlQs Elite",
                    price: 6000,
                    coins: 1000,
                  })
                }
                className="bg-[#DB9245] text-white font-semibold py-2 rounded-md mt-auto text-sm">
                Get It Now
              </button>
            </div>
            {/* Custom Card */}
            <div className="bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-6 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full relative text-xs">
              <div className="absolute top-0 left-0 w-full bg-[#25262B] text-[#DB9245] text-xs font-bold rounded-t-xl py-2 text-center">
                FLAT 10 % OFF
              </div>
              <h3 className="font-bold text-lg mt-4 mb-2 text-[#25262B]">
                FabrlQs Custom
              </h3>
              <style>{`
                input[type=number]::-webkit-outer-spin-button,
                input[type=number]::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                input[type=number] {
                  -moz-appearance: textfield;
                }
              `}</style>
              <input
                type="number"
                value={customCoins}
                min={1000}
                onChange={(e) => setCustomCoins(Number(e.target.value))}
                placeholder="Enter Amount of Claw Coins"
                className="border border-[#25262B] rounded-md px-2 py-2 mb-2 w-full text-xs h-10 bg-[#DB924580]"
              />

              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ {customCoins * 10 - customCoins * 10 * 0.1}
              </div>

              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>Custom Amount of Claw Coins</li>
                <li>Claw Coins Must Be 1000+</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                onClick={() =>
                  handlePayment({
                    name: "FabrlQs Custom",
                    price: customCoins * 10 - customCoins * 10 * 0.1,
                    coins: customCoins,
                  })
                }
                className="bg-[#DB9245] text-white font-semibold py-2 rounded-md mt-auto text-sm">
                Get It Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
