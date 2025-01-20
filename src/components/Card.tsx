import { useState } from "react";
import { Character } from "../types/characters";
import styles from "./Card.module.scss";

const Card: React.FC<Character> = ({
  name,
  // species,
  // image,
  gender,
  // location,
  episode,
}) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
        <div className={styles.front}>
          {/* <img src={image} alt={name} className={styles.image} /> */}
          <h2>{name}</h2>
          <p>This is the front side of the card.</p>
          <p>{name}</p>
          <p>{gender}</p>
        </div>
        <div className={styles.back}>
          <h2>Back Side</h2>
          <p>This is the back side of the card.</p>
          <ul>
            {episode.map((ep) => (
              <li key={ep.id}>
                {ep.name},{ep.episode}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
