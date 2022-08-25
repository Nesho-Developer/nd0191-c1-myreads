import { Fragment } from "react";
import Book from "./Book";
import classes from "./Bookshelf.module.css";

const Bookshelf = ({ title, books, mode }) => {
  const renderedBox = books.map((book) => (
    <li key={book.id}>
      <Book book={book} mode={mode} />
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
              {books.length === 0 && (
                <div>
                  {title && (
                    <p role="paragraph">
                      there is no anyBooks in this shelf.
                    </p>
                  )}
                  {!title && (
                    <p role="paragraph">
                      Search by title, author, or ISBN to view more books.
                    </p>
                  )}
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
