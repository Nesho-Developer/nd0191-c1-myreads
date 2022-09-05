import Home from "../../pages/Home";
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import mockFetch, { book1 } from "../mocks/mockFetch";
import { act } from "react-dom/test-utils";
import Book from "../../components/Book";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch as jest.Mock);
  // global.Headers = () => ({
  //   Authorization: "zjbuspe9",
  // });
});

afterEach(() => {
  // jest.restoreAllMocks();
});

describe("test Book Component", () => {
  test("should render the Book Component", async () => {
    await act(async () =>
      renderWithProviders(<Book book={book1} mode="list" />)
    );
    jest.setTimeout(2000);
    expect(screen.getByText(/Amos Q. Haviv/i)).toBeInTheDocument;
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
    expect(screen.queryByRole("link")).not.toBeInTheDocument;
  });
});
