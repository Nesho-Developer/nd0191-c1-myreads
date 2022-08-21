import { Fragment } from "react"
import classes from './Header.module.css'

const Header = (props) => {
    return (
      <Fragment>
        <div className={classes.header}>
          <h1>MyReads</h1>
        </div>
      </Fragment>
    );
}

export default Header;