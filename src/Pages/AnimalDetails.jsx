import { useParams } from "react-router-dom";

function AnimalDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Animal #{id}</h2>
      <p>Name: Golden Retriever</p>
      <p>Age: 3 years</p>
      <p>Price: $800</p>
    </div>
  );
}

export default AnimalDetails;
