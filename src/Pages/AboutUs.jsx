import React from "react";

function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-[#f1f8e9] to-white py-16 px-6 md:px-12 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-8 text-center">
          About Farmart
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-gray-700">
          <strong className="text-green-800">Farmart</strong> is a digital
          marketplace built to revolutionize how farmers connect with buyers. At
          our core, we believe in empowering the hardworking farmers who sustain
          our communities — by giving them direct access to the people who value
          their products most.
        </p>

        <p className="text-lg leading-relaxed mb-10 text-gray-700">
          For generations, farmers have relied on middlemen to bring their
          livestock to market. While once necessary, these intermediaries often
          take a significant share of profits. Farmart cuts through that
          inefficiency with a simple solution: transparency and direct access.
        </p>

        <div className="border-l-4 border-green-600 pl-4 mb-12">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To eliminate unnecessary middlemen in agriculture and ensure farmers
            receive fair value for their livestock — while offering buyers a
            reliable and transparent platform to purchase healthy, high-quality
            animals.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-600 mb-4">What We Do</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Farmart provides a user-friendly e-commerce platform where farmers
            can list animals, manage their listings, and engage directly with
            customers.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Buyers can explore a wide selection of livestock, search and filter
            by type or breed, and complete secure transactions with confidence.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Who We Serve
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
            <li>
              <strong className="text-green-700">Farmers:</strong> List and
              manage animals for sale, confirm or reject orders, and receive
              payments directly — no gatekeepers, no hidden fees.
            </li>
            <li>
              <strong className="text-green-700">Buyers:</strong> Discover
              livestock from local farmers, filter by age and breed, and
              complete purchases seamlessly through a secure checkout.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
