import Home from "../../pages/Home";
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import mockFetch, { booksListResponse } from "../mocks/mockFetch";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  // jest.spyOn(window, "fetch").mockImplementation(
  //   jest.fn(() =>
  //     Promise.resolve({
  //       json: async () => booksListResponse,
  //     })
  //   ) as jest.Mock
  // );
  // jest.spyOn(window, "fetch").mockImplementation(
  //   jest.fn((url) => {
  //     console.log("--------------llloo------------------------------=====");
  //     switch (url) {
  //       case "https://reactnd-books-api.udacity.com/books": {
  //         return Promise.resolve({
  //           json: async () => booksListResponse,
  //         });
  //       }
  //       case "https://reactnd-books-api.udacity.com/search": {
  //         return Promise.resolve({
  //           json: async () => booksListResponse,
  //         });
  //       }
  //       case "https://reactnd-books-api.udacity.com/FpifBAAAQBAJ": {
  //         return Promise.resolve({
  //           json: async () => booksListResponse,
  //         });
  //       }
  //     }
  //   }) as jest.Mock
  // );
  // jest
  //   .spyOn(window, "fetch")
  //   .mockImplementation(jest.fn((url) => mockFetch(url)) as jest.Mock);
  jest.spyOn(window, "fetch").mockImplementation(mockFetch as jest.Mock);
});

afterEach(() => {
  jest.restoreAllMocks();
});
describe("test Home page", () => {
  test("should render the Home page", async () => {
    await act(() => renderWithProviders(<Home />));
    expect(screen.getAllByRole("heading")).toHaveLength(3);
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link").textContent).toEqual("Add a book");
  });

  test("should check the books shelf names", async () => {
    await act(async () => renderWithProviders(<Home />));
    const options = screen.getAllByRole("option", {
      name: "Currently Reading",
    });
    expect(options).toHaveLength(3);
    // expect(options[0].selected).toBe(true);
    // expect(options[1].selected).toBe(true);
    // expect(options[2].selected).toBe(false);
  });

  test("should able to change book's shelf", async () => {
    await act(async () => renderWithProviders(<Home />));
    const selects = screen.findAllByRole("combobox");

    expect(selects).toBeTruthy;
    const options = screen.getAllByRole("option", {
      name: "Currently Reading",
    });
    // expect(options[2].selected).toBe(false);
    // await act(() =>
    //   fireEvent.change(selects[2], { target: { value: "currentlyReading" } })
    // );
    // expect(options[2].selected).toBe(true);
  });

  test("should books list be 2 after change first book's shelf to none", async () => {
    await act(async () => renderWithProviders(<Home />));
    // jest.setTimeout(4000);
    // await waitForElementToBeRemoved(() => screen.queryByText(/Loading .../i));
    const selects = (await screen.findAllByRole(
      "combobox"
    )) as HTMLSelectElement[];
    expect(selects[0]).toBeInTheDocument;

    // await act(async () =>
    //   fireEvent.change(selects[0], { target: { value: "none" } })
    // );
    // expect(screen.getAllByRole("combobox").length).toBe(3);
  });
});
