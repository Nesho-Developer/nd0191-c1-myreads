import { Fragment, useEffect } from "react";
import SearchButton from "../components/SearchButton";
import Bookshelf from "../components/Bookshelf";
import { bookActions } from "../store/BooksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const Home = () => {
  const booksDispatch = useDispatch<AppDispatch>();
  const { readingBooks, wantBooks, finishedBooks, loading } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    async function loadData() {
      booksDispatch(bookActions.getBooks());
    }
    loadData();
  }, [booksDispatch]);
  return (
    <Fragment>
      {!loading && (
        <div className="list-books">
          <Bookshelf
            name="currentReading"
            title="Currently Reading"
            mode="list"
            books={readingBooks}
          />
          <Bookshelf
            name="wantToRead"
            title="Want to Read"
            mode="list"
            books={wantBooks}
          />
          <Bookshelf
            name="read"
            title="Read"
            mode="list"
            books={finishedBooks}
          />
          <SearchButton />
        </div>
      )}
      {loading && <p>Loading ...</p>}
    </Fragment>
  );
};

export default Home;
