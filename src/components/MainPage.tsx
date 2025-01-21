import { useQuery } from "@apollo/client";
import { SEARCH_CHARACTERS, GET_CHARACTERS } from "../graphql/queries";
import { Character } from "../types/characters";
import Card from "../components/Card";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "../App.module.scss";
import Loader from "./Loader";
import useDebounce from "../hooks/useDebounce";
import { useInputDebouncer } from "../hooks/useInputDebouncer";

function MainPage() {
  const [input, setInput] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const [debouncedPage, setDebouncedPage] = useState<number>(pageCount);
  const newValue = useInputDebouncer(input, 15000);

  const {
    loading,
    error,
    data: allCharacter,
  } = useQuery(GET_CHARACTERS, {
    variables: { page: debouncedPage },
  });
  const { data: searchedCharacter } = useQuery(SEARCH_CHARACTERS, {
    variables: { name: newValue },
    skip: input.length < 3,
  });

  const { cancel, isReady } = useDebounce(
    () => {
      setDebouncedPage(pageCount);
    },
    1500,
    [pageCount]
  );

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const displayData = searchedCharacter ? searchedCharacter : allCharacter;
  const maxPages = allCharacter.characters.info.pages;

  const handleNextPage = () => {
    if (isReady) {
      cancel();
      setPageCount((prev) => (prev < maxPages ? prev + 1 : 1));
    }
  };

  const prevPage = () => {
    if (isReady) {
      cancel();
      setPageCount((prev) => (prev > 1 ? prev - 1 : maxPages));
    }
  };

  const handleSearch = () => {
    //
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>My First Apollo App</h1>

        <div className={styles.controlPanel}>
          <Button onVoid={prevPage} disabled={!isReady}>
            Prev
          </Button>
          <Input value={input} onChange={setInput} onEnter={handleSearch} />
          <Button onVoid={handleNextPage} disabled={!isReady}>
            Next
          </Button>
        </div>
        <div className={styles.pageCounter}>
          Page: {debouncedPage || pageCount}
        </div>
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
