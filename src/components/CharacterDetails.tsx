import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_CHARACTER_DETAILS } from "../graphql/queries";
import { Character } from "../types/characters";
import styles from "./CharacterDetails.module.scss";
import Loader from "./Loader";

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<{ character: Character }>(
    GET_CHARACTER_DETAILS,
    {
      variables: { id },
    }
  );

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.character) return <p>No character found</p>;

  const { character } = data;

  return (
    <div className={styles.details}>
      <Link to="/" className={styles.backButton}>
        Back
      </Link>
      <h2>{character.name}</h2>
      <img
        src={character.image}
        alt={character.name}
        className={styles.characterImage}
      />
      <p>Species: {character.species}</p>
      <p>Location: {character.location.name}</p>
      <table className={styles.episodeTable}>
        <thead>
          <tr>
            <th>Episode</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {character.episode.map((ep) => (
            <tr key={ep.id}>
              <td>{ep.episode}</td>
              <td>{ep.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterDetails;
