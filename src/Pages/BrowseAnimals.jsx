import { Link } from "react-router-dom";

const animals = [
  { id: 1, name: "Golden Retriever", age: 3, price: 800 },
  { id: 2, name: "Holstein Cow", age: 2, price: 1200 },
  { id: 3, name: "Suffolk Sheep", age: 1, price: 400 },
];

function BrowseAnimals() {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Animals</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id} className="mb-4 p-4 bg-white rounded shadow">
            <Link
              to={`/animals/${animal.id}`}
              className="text-lg font-semibold text-green-700 hover:underline"
            >
              {animal.name}
            </Link>
            <p>Age: {animal.age} years</p>
            <p>Price: ${animal.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrowseAnimals;
