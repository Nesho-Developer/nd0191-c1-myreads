import { Fragment } from "react";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";

const Search = (props) => {
  return (
    <Fragment>
      <div className="search-books">
        <SearchBar />
        <SearchResult />
      </div>
    </Fragment>
  );
};

export default Search;
