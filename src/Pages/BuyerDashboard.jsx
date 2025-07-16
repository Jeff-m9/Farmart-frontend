function BuyerDashboard() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
        Buyer Dashboard
      </h1>
      <p className="text-gray-700 mb-6">
        Welcome back! Here are some featured animals for you:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-800">
        <li className="font-semibold">Dog - Golden Retriever</li>
        <li className="font-semibold">Cat - Persian</li>
        <li className="font-semibold">Bird - Parrot</li>
      </ul>
    </div>
  );
}

export default BuyerDashboard;
