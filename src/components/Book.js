import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../store/BooksSlice";
import classes from "./Book.module.css";
import { useNavigate } from "react-router-dom";

const Book = ({ book, mode }) => {
  let timer;
  const [isChange, setBookChange] = useState(false);
  const [shelf, setShelf] = useState("none");
  const dispatch = useDispatch();
  const { readingBooks, wantBooks, finishedBooks, loading } = useSelector(
    (state) => state.books
  );
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const shelf = event.target.value;
    setBookChange(true);
    dispatch(bookActions.updateBooks({ book, shelf }));
    if (mode !== "search") dispatch(bookActions.getBooks());
    timer = setTimeout(() => {
      setBookChange(false);
    }, 1000);
  };

  useEffect(() => {
    const shelf = [...readingBooks, ...wantBooks, ...finishedBooks].find(
      (b) => b.id === book.id
    )?.shelf;

    setShelf(shelf ? shelf : "none");
    return () => {
      clearTimeout(timer);
    };
  }, [readingBooks, wantBooks, finishedBooks, timer, book]);

  const onBookClickedHandler = () => {
    navigate(`books/${book.id}`);
  };
  return (
    <Fragment>
      <div className={classes["book"]}>
        <div className={classes["book-top"]}>
          {loading && isChange && <div className="lds-dual-ring" />}
          <div
            onClick={onBookClickedHandler}
            className={classes["book-cover"]}
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book?.imageLinks?.smallThumbnail})`,
            }}
          ></div>
          {!isChange && (
            <div className={classes["book-shelf-changer"]}>
              <select
                data-testid={book.id}
                value={mode === "search" ? shelf : book?.shelf}
                onChange={onChangeHandler}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                {/* {!book?.shelf && <option value="none">None</option>} */}
                <option value="none">None</option>
              </select>
            </div>
          )}
        </div>
        <div onClick={onBookClickedHandler} className={classes["book-title"]}>
          {book?.title}
        </div>
        <div onClick={onBookClickedHandler} className={classes["book-authors"]}>
          {book?.authors?.join(" - ")}
        </div>
      </div>
    </Fragment>
  );
};

export default Book;
