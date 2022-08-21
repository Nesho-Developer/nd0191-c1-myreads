import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { bookReducer } from "./BooksSlice";

const store = configureStore({
  reducer: { books: bookReducer },
});

const StoreProvider = (props) => {
  return <Provider store={store}>{props.children} </Provider>;
};
export default StoreProvider;
