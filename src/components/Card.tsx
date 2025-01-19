// import { useState } from "react";
import { Character } from "../types/characters";
import styles from "./Card.module.scss";

const Card: React.FC<Character> = ({
  name,
  species,
  image,
  gender,
  location,
}) => {
  // const [flipped, setFlipped] = useState<boolean>(false);

  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <p>{species}</p>
      <p>{name}</p>
      <p>{gender}</p>
      <p>{location.name}</p>
    </div>
  );
};

export default Card;
