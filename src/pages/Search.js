import { Fragment, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import { search } from "../pages/api/BooksAPI";

const Search = () => {
  const [books, setBooks] = useState([]);
  const searchInputHandler = useDebouncedCallback(
    (event) => {
      const text = event.target.value.trim();
      if (text.length === 0) {
        setBooks([]);
        return;
      }
      search(text).then((data) => {
        if (data?.error) {
        } else {
          setBooks(data);
        }
      });
    },
    500,
    { maxWait: 2000 }
  );
  return (
    <Fragment>
      <SearchBar onSearchInputChange={searchInputHandler} />
      <SearchResult books={books} />
    </Fragment>
  );
};

export default Search;
