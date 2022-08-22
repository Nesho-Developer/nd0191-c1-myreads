import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props) => {
  const location = useLocation();
  return (
    <Fragment>
      {location.pathname !== "/search" && (
        <div className={classes.header}>
          <h1>MyReads</h1>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
