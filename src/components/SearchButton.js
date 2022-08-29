import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchButton.module.css";

const SearchButton = (props) => {
  const navigate = useNavigate();

  const onShowSearchHandler = () => {
    navigate("/search");
  };

  return (
    <Fragment>
      <div className={classes["open-search"]}>
        <a href="/#" onClick={onShowSearchHandler}>
          Add a book
        </a>
      </div>
    </Fragment>
  );
};

export default SearchButton;
