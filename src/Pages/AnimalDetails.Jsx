import { useParams } from "react-router-dom";

function AnimalDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Animal Details - ID: {id}</h1>
      <p>This page shows detailed info about the animal with ID {id}.</p>
      <ul>
        <li>Name: Golden Retriever</li>
        <li>Age: 3 years</li>
        <li>Price: $800</li>
      </ul>
    </div>
  );
}

export default AnimalDetails;
