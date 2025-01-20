import "./App.css";
import { useQuery } from "@apollo/client";
import { SEARCH_CHARACTERS, GET_CHARACTERS } from "./graphql/queries";
import { Character } from "./types/characters";
import Card from "./components/Card";
import styles from "./components/Card.module.scss";
import { useState } from "react";

function App() {
  const [input, setInput] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);

  const {
    loading,
    error,
    data: allCharacter,
  } = useQuery(GET_CHARACTERS, {
    variables: { page: pageCount },
  });
  const { data: searchedCharacter } = useQuery(SEARCH_CHARACTERS, {
    variables: { name: input },
    skip: input.length < 3,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const displayData = searchedCharacter ? searchedCharacter : allCharacter;
  const maxPages = allCharacter.characters.info.pages;
  console.log(maxPages);

  const handlePageNext = () => {
    setPageCount((prev) => prev + 1);
    if (pageCount >= maxPages) {
      setPageCount(1);
    }
  };

  const prevPage = () => {
    setPageCount((prev) => prev - 1);
    if (pageCount <= 1) {
      setPageCount(maxPages);
    }
  };

  return (
    <div>
      <h2>My first Apollo App</h2>
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={handlePageNext}>Next</button>
      <button onClick={prevPage}>Prev</button>
      <p>Page:{pageCount}</p>
      <div className={styles.wrapper}>
        {displayData.characters.results.map((character: Character) => (
          <Card key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
}

export default App;
