import "./App.css";
import React, { useState } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";

const Search = React.lazy(() => import("./pages/Search"));
const Books = React.lazy(() => import("./pages/Books"));
const Details = React.lazy(() => import("./pages/Details"));
function App() {
  return (
    <div className="app">
      <React.Suspense fallback={<>...</>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />}></Route>
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
