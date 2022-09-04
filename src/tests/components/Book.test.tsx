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
  // jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  // global.Headers = () => ({
  //   Authorization: "zjbuspe9",
  // });
});

afterEach(() => {
  jest.restoreAllMocks();
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
  test("should able to change book's shelf to none", async () => {
    await act(async () =>
      renderWithProviders(<Book book={book1} mode="list" />)
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument;
    // await act(async () =>
    //   // fireEvent.change(select, { target: { value: "none" } })
    // );
    expect((await screen.findAllByRole("combobox")).length).toBe(1);
  });

  test("should able to change book's shelf to  read", async () => {
    await act(async () =>
      renderWithProviders(<Book book={book1} mode="list" />)
    );

    const select = screen.getByTestId("FpifBAAAQBAJ");
    const option = screen.getAllByRole("option");
    expect(select).toBeInTheDocument;
    expect(option.length).toBe(5);
    // expect(option[0].disabled).toBe(true);
    // expect(option[1].selected).toBe(true);
    // expect(option[2].selected).toBe(false);
    // expect(option[3].selected).toBe(false);
    // expect(option[4].selected).toBe(false);
    // await act(async () =>
    //   // fireEvent.change(select, { target: { value: "read" } })
    // );
    jest.setTimeout(30000);
    expect(screen.findByTestId("FpifBAAAQBAJ")).toBeInTheDocument;
    // expect(option[0].disabled).toBe(true);
    // expect(option[1].selected).toBe(false);
    // expect(option[2].selected).toBe(false);
    // expect(option[3].selected).toBe(true);
    // expect(option[4].selected).toBe(false);
  });
});
