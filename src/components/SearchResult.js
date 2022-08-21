import { Fragment } from "react"
import Bookshelf from "./Bookshelf";
import classes from './SearchResult.module.css'

const SearchResult = (props) => {
    return (
      <Fragment>
        <div className={classes["search-books-results"]}>
          <Bookshelf/>
        </div>
      </Fragment>
    );
}

export default SearchResult;