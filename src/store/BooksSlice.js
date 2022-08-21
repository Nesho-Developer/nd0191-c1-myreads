import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from '../pages/api/BooksAPI'


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
    books: [],
    loading : false,
    error: ''
  };
}

function createExtraActions() {

  return {
    getAll: getAll(),
  };

  function getAll() {
    return createAsyncThunk(
      `${name}/getAll`,
      async () => await API.getAll()
    );
  }
}

function createExtraReducers() {
  return {
    ...getAll(),
  };

  function getAll() {
    var { pending, fulfilled, rejected } = extraActions.getAll;
    return {
      [pending]: (state) => {
        state.loading = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.books = action.payload;
      },
      [rejected]: (state, action) => {
        state.error = { error: action.error };
      },
    };
  }
}
