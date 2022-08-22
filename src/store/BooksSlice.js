import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll, update } from "../pages/api/BooksAPI";

// create slice

const name = "readingBooks";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const bookActions = { ...slice.actions, ...extraActions };
export const bookReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    readingBooks: [],
    wantBooks: [],
    finishedBooks: [],
    loading: false,
    error: "",
  };
}

function createExtraActions() {
  return {
    getBooks: getBooks(),
    updateBooks: updateBooks(),
  };

  function getBooks() {
    return createAsyncThunk(`${name}/getBooks`, async () => await getAll());
  }

  function updateBooks() {
    return createAsyncThunk(`${name}/updateBooks`, async ({ book, shelf }) =>
      update(book, shelf)
    );
  }
}

function createExtraReducers() {
  return {
    ...getBooks(),
    ...updateBooks(),
  };

  function getBooks() {
    var { pending, fulfilled, rejected } = extraActions.getBooks;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        const books = action.payload;
        state.readingBooks = books.filter(
          (bo) => bo.shelf === "currentlyReading"
        );
        state.wantBooks = books.filter((bo) => bo.shelf === "wantToRead");
        state.finishedBooks = books.filter((bo) => bo.shelf === "read");
        state.loading = false;
      },
      [rejected]: (state, action) => {
        state.error = action.error;
        state.loading = false;
      },
    };
  }
  function updateBooks() {
    var { pending, fulfilled, rejected } = extraActions.updateBooks;
    return {
      [pending]: (state) => {
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        state.loading = false;
      },
      [rejected]: (state, action) => {
        state.error = action.error;
        state.loading = false;
      },
    };
  }
}
