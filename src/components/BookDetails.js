import { Fragment, useState, useEffect } from "react";
import { get } from "../pages/api/BooksAPI";
import classes from "./BookDetails.module.css";

const BookDetails = ({ id }) => {
  const [book, setBook] = useState();
  useEffect(() => {
    get(id).then((data) => {
      setBook(data);
    });
  }, [id]);
  return (
    <Fragment>
      <div className={classes["book"]}>
        <div className={classes["book-top"]}>
          <div
            className={classes["book-cover"]}
            style={{
              width: 200,
              height: 300,
              backgroundImage: `url(${book?.imageLinks?.smallThumbnail})`,
            }}
          ></div>
          <div className={classes["book-top-content"]}>
            <div>
              <span>Title:</span>
              {book?.title}
            </div>
            <div>
              <span>Author:</span>
              {book?.authors?.join(" - ")}
            </div>
            <div>
              <span>category:</span>
              {book?.categories?.join(" - ")}
            </div>
            <div>
              <span>Rating:</span>
              {book?.averageRating}
            </div>
            <div>
              <span>Language:</span>
              {book?.language}
            </div>
            <div>
              <span>Published Date:</span>
              {book?.publishedDate}
            </div>
            <div>
              <span>Page Count:</span>
              {book?.pageCount}
            </div>
          </div>
        </div>
        <div className={classes["book-down"]}>
          <div>
            <span>Short Description:</span>
            {book?.description}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default BookDetails;
