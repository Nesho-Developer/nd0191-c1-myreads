import { Fragment, useEffect, useState } from "react";
import SearchButton from "../components/SearchButton";
import Bookshelf from "../components/Bookshelf";
import { getAll } from "../pages/api/BooksAPI";
import { bookActions } from "../store/BooksSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = (props) => {
  const booksDispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    async function loadData() {
      booksDispatch(bookActions.getAll());
    }
    loadData();
  }, []);
  return (
    <Fragment>
      <div className="list-books">
        <Bookshelf title="Currently Reading" books={books} />
        <Bookshelf title="Want to Read" books={[]} />
        <Bookshelf title="Read" books={[]} />
        <SearchButton />
      </div>
    </Fragment>
  );
};

export default Home;
