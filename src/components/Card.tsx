import { Link } from "react-router-dom";
import { Character } from "../types/characters";
import styles from "./Card.module.scss";

const Card: React.FC<Character> = ({
  name,
  species,
  image,
  id,
  // gender,
  // location,
  // episode,
}) => {
  return (
    <Link to={`/character/${id}`}>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.image} />
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.species}>{species}</p>
      </div>
    </Link>
  );
};

export default Card;
