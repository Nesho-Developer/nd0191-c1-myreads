import { configureStore } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { bookReducer } from "./BooksSlice";

const store = configureStore({
  reducer: { books: bookReducer },
});

const StoreProvider: React.FC<{ children: ReactNode }> = (props) => {
  return <Provider store={store}>{props.children} </Provider>;
};
export default StoreProvider;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
