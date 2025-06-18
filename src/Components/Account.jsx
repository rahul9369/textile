import React from "react";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-[#FCD9A4] px-4 py-6 sm:px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row pt-20 justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Your Account
        </h1>
        <button className="bg-[#25262B] text-white px-4 py-2 rounded-md hover:opacity-90">
          Log Out
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-[#DB9245] p-4 sm:p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Soumya Snigdha Banik"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
            <input
              type="email"
              placeholder="soumyabanik0@gmail.com"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
            <input
              type="text"
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
        </div>

        {/* Plans */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            AI Labs Pricing Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* ONE TIME PLAN */}
            <div className="border-2 border-[#292C33] p-4 lg:pb-10 rounded-md w-full flex flex-col justify-between">
    <div>
          <p className="text-sm text-[#E29642] font-semibold mb-2">
          Package Type
          </p>
        <h3 className="text-lg font-bold mb-2 text-[#DB9245]">
          ONE TIME
       </h3>
    <ul className="text-sm list-disc pl-6 space-y-1 mb-4">
      <li>Base Claw Coins Assigned One Time by Admin</li>
      <li>Per Image Generated Costs 1 CC</li>
      <li>Per Image Edit Costs 1 CC</li>
      <li>
        Add On ( <strong>1 CC = ₹ 6</strong> )
      </li>
    </ul>
  </div>
  <button className="bg-[#DB9245] w-full py-2 text-white rounded-md hover:opacity-90 lg:mt-6">
    ACTIVE
  </button>
</div>


  {/* MONTHLY PLAN */}
<div className="border-2 border-[#292C33] p-4 rounded-md w-full flex flex-col justify-between lg:pb-10">
        <div>
                <p className="text-sm text-[#E29642] font-semibold mb-2">
                  Package Type
                </p>
                <h3 className="text-lg font-bold mb-2 text-[#DB9245]">
                  MONTHLY
                </h3>
                <ul className="text-sm list-disc pl-6 space-y-1 mb-4">
                  <li>Base Claw Coins Assigned Monthly by Admin</li>
                  <li>Per Image Generated Costs 1 CC</li>
                  <li>Per Image Edit Costs 1 CC</li>
                  <li>
                    Add On ( <strong>1 CC = ₹ 6</strong> )
                  </li>
                </ul>
              </div>
              <button className="bg-[#292C33] w-full py-2 text-white rounded-md hover:opacity-90 lg:mt-6">
                GET IT NOW
              </button>
            </div>

            {/* Empty div for spacing */}
            <div className="hidden xl:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
