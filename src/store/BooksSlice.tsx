import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import Book from "../model/Book";
import { getAll, update } from "../pages/api/BooksAPI";

// create slice
interface InitialState {
  readingBooks: Book[];
  wantBooks: Book[];
  finishedBooks: Book[];
  loading: boolean;
  error: string;
}

const name = "readingBooks";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers: {}, extraReducers });

// exports

export const bookActions = { ...slice.actions, ...extraActions };
export const bookReducer = slice.reducer;

// implementation

function createInitialState(): InitialState {
  return {
    readingBooks: [],
    wantBooks: [],
    finishedBooks: [],
    loading: false,
    error: "",
  };
}
function getBooksAction() {
  return createAsyncThunk(`${name}/getBooks`, async () => await getAll());
}

function updateBooksAction() {
  return createAsyncThunk(
    `${name}/updateBooks`,
    async (bookDt: { book: Book; shelf: string }, thunkApi) => {
      try {
        return update(bookDt.book, bookDt.shelf);
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  );
}

function createExtraActions() {
  return {
    getBooks: getBooksAction(),
    updateBooks: updateBooksAction(),
  };
}

function createExtraReducers() {
  return {
    ...getBooks(),
    ...updateBooks(),
  };

  function getBooks() {
    const { pending, fulfilled, rejected } = getBooksAction();
    return {
      [pending.toString()]: (state: InitialState) => {
        state.loading = true;
        // console.log("status pending: ", state);
      },
      [fulfilled.toString()]: (
        state: InitialState,
        action: PayloadAction<any>
      ) => {
        // console.log("status fulfilled: ", action, state);
        const books = action.payload;
        state.readingBooks = books.filter(
          (bo: Book) => bo.shelf === "currentlyReading"
        );
        state.wantBooks = books.filter((bo: Book) => bo.shelf === "wantToRead");
        state.finishedBooks = books.filter((bo: Book) => bo.shelf === "read");
        state.loading = false;
        // console.log("status fulfilled state: ", state);
      },
      [rejected.toString()]: (
        state: InitialState,
        action: PayloadAction<any>
      ) => {
        state.error = action.payload;
        state.loading = false;
        // console.log("status reject: ", state);
      },
    };
  }
  function updateBooks() {
    const { pending, fulfilled, rejected } = updateBooksAction();
    return {
      [pending.toString()]: (state: InitialState) => {
        state.loading = true;
      },
      [fulfilled.toString()]: (
        state: InitialState,
        action: PayloadAction<any>
      ) => {
        state.loading = false;
      },
      [rejected.toString()]: (
        state: InitialState,
        action: PayloadAction<any>
      ) => {
        // console.log(action.payload);

        state.error = action.payload;
        state.loading = false;
      },
    };
  }
}
