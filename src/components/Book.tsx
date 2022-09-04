import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../store/BooksSlice";
import classes from "./Book.module.css";
import { useNavigate } from "react-router-dom";
import BookModel from "../model/Book";
import { AppDispatch, RootState } from "../store";

const Book: React.FC<{ book: BookModel; mode: string }> = ({ book, mode }) => {
  let timer: NodeJS.Timeout;
  const [isChange, setBookChange] = useState(false);
  const [shelf, setShelf] = useState("none");
  HTMLSelectElement;
  const dispatch = useDispatch<AppDispatch>();
  const { readingBooks, wantBooks, finishedBooks, loading } = useSelector(
    (state: RootState) => state.books
  );
  const navigate = useNavigate();

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const shelf = event.target.value;
    setBookChange(true);
    dispatch(bookActions.updateBooks({ book, shelf }));
    if (mode !== "search") dispatch(bookActions.getBooks());
    timer = setTimeout(() => {
      setBookChange(false);
    }, 1000);
  };

  useEffect(() => {
    const books: BookModel[] = [
      ...readingBooks,
      ...wantBooks,
      ...finishedBooks,
    ];
    const shelf = books.find((bo) => bo.id === book.id)?.shelf;

    setShelf(shelf ? shelf : "none");
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
                value={mode === "search" ? shelf : book?.shelf}
                onChange={onChangeHandler}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                {!book?.shelf && <option value="none">None</option>}
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
