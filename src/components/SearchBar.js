import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const navigate = useNavigate();

  const onBackToHomeHandler = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <div className={classes["search-books-bar"]}>
        <a
          href="/#"
          className={classes["close-search"]}
          onClick={onBackToHomeHandler}
        >
          Close
        </a>
        <div className={classes["search-books-input-wrapper"]}>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={props.onSearchInputChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SearchBar;
