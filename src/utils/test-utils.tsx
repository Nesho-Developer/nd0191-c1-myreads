import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import { bookReducer } from "../store/BooksSlice";
import { MemoryRouter } from "react-router-dom";
export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { books: bookReducer },
    }),
    ...renderOptions
  } = {}
): any {
  function Wrapper(props: any) {
    return (
      <MemoryRouter>
        <Provider store={store}>{props.children}</Provider>
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
