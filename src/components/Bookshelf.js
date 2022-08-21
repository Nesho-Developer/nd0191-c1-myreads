import { Fragment } from "react";
import Book from "./Book";
import classes from "./Bookshelf.module.css";

const Bookshelf = ({ title, books }) => {
  console.log(title, books);
  const renderedBox = books.map((book) => (
    <li key={book.id}>
      <Book book={book} />
    </li>
  ));
  return (
    <Fragment>
      <div className={classes["list-books-content"]}>
        <div className={classes["bookshelf"]}>
          {title && <h2 className={classes["bookshelf-title"]}>{title}</h2>}
          <div className={classes["bookshelf-books"]}>
            <ol className={classes["books-grid"]}>
              {renderedBox}
              {books.length == 0 && (
                <div>
                  <p> there is no anyBooks in this shelf.</p>
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Bookshelf;
