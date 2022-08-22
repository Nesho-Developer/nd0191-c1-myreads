import { Fragment, useEffect } from "react";
import SearchButton from "../components/SearchButton";
import Bookshelf from "../components/Bookshelf";
import { bookActions } from "../store/BooksSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = (props) => {
  const booksDispatch = useDispatch();
  const { readingBooks, wantBooks, finishedBooks, loading } = useSelector(
    (state) => state.books
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
            title="Currently Reading"
            mode="list"
            books={readingBooks}
          />
          <Bookshelf title="Want to Read" mode="list" books={wantBooks} />
          <Bookshelf title="Read" mode="list" books={finishedBooks} />
          <SearchButton />
        </div>
      )}
      {loading && <p>Loading ...</p>}
    </Fragment>
  );
};

export default Home;
