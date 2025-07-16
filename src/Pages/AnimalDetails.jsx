import { useParams } from "react-router-dom";

function AnimalDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Animal #{id}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Name:</span> Golden Retriever
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Age:</span> 3 years
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Price:</span> $800
      </p>
    </div>
  );
}

export default AnimalDetails;
