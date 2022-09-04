import { Fragment } from "react";
import Book from "../model/Book";
import Bookshelf from "./Bookshelf";
import classes from "./SearchResult.module.css";

const SearchResult: React.FC<{ books: Book[] }> = (props) => {
  return (
    <Fragment>
      <div className={classes["search-books-results"]}>
        <Bookshelf books={props.books} mode="search" />
      </div>
    </Fragment>
  );
};

export default SearchResult;
