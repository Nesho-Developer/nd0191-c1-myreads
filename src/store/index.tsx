import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { bookReducer } from "./BooksSlice";

const rootReducer = combineReducers({
  books: bookReducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
const StoreProvider: React.FC<{ children: ReactNode }> = (props) => {
  return <Provider store={setupStore()}>{props.children} </Provider>;
};
export default StoreProvider;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
