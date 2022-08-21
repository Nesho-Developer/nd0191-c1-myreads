import { Fragment } from "react";
import classes from "./Book.module.css";

const Book = ({ book }) => {
  console.log(book);
  return (
    <Fragment>
      <div className={classes["book"]}>
        <div className={classes["book-top"]}>
          <div
            className={classes["book-cover"]}
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book?.imageLinks?.smallThumbnail})`,
            }}
          ></div>
          <div className={classes["book-shelf-changer"]}>
            <select>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">To Kill a Mockingbird</div>
        <div className="book-authors">Harper Lee</div>
      </div>
    </Fragment>
  );
};

export default Book;
