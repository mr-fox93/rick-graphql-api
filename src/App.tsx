import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./graphql/queries";
import { Character } from "./types/characters";

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>My first Apollo App</h2>
      <ul>
        {data.characters.results.map((character: Character) => (
          <li key={character.id}>
            <p>
              <strong>{character.name}</strong>
            </p>
            <p>Species: {character.species}</p>
            <img src={character.image} alt={character.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
