import { useQuery } from "@apollo/client";
import { SEARCH_CHARACTERS, GET_CHARACTERS } from "../graphql/queries";
import { Character } from "../types/characters";
import Card from "../components/Card";
// import styles from "./components/Card.module.scss";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Button from "../components/Button";
import Input from "../components/Input";
// import useDebounce from "./hooks/useDebounce";
import styles from "../App.module.scss";
import Loader from "./Loader";

function MainPage() {
  const [input, setInput] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const debounce = useDebounce(input, 15000);
  // useDebounce(() => handlePageNext(), 1500, [pageCount]);

  const {
    loading,
    error,
    data: allCharacter,
  } = useQuery(GET_CHARACTERS, {
    variables: { page: pageCount },
  });
  const { data: searchedCharacter } = useQuery(SEARCH_CHARACTERS, {
    variables: { name: debounce },
    skip: input.length < 3,
  });

  if (loading) return <Loader />;
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
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>My First Apollo App</h1>
        <div className={styles.controlPanel}>
          <Button onVoid={prevPage}>Prev</Button>
          <Input value={input} onChange={setInput} />
          <Button onVoid={handlePageNext}>Next</Button>
        </div>
        <div className={styles.pageCounter}>Page: {pageCount}</div>
      </header>
      <div className={styles.wrapper}>
        {displayData.characters.results.map((character: Character) => (
          <Card key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
