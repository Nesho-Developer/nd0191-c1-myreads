import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <div className={classes.content}>
        <div>{props.children}</div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Layout;
