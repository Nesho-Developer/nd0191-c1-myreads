import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { bookActions } from "./store/BooksSlice";
const Search = React.lazy(() => import("./pages/Search"));
const Books = React.lazy(() => import("./pages/Books"));
const Details = React.lazy(() => import("./pages/Details"));
function App() {
    const booksDispatch = useDispatch();
  const [showSearchPage, setShowSearchpage] = useState(false);
  useEffect(() => {
    async function loadData() {
      booksDispatch(bookActions.getBooks());
    }
    loadData();
  }, [booksDispatch]);
  return (
    <div className="app">
      <React.Suspense fallback={<>...</>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />}></Route>
            <Route path="home" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="books">
              <Route index element={<Books />} />
              <Route path=":id" element={<Details />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
