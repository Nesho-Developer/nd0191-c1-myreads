import Home from "../../pages/Home";
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import mockFetch from "../mocks/mockFetch";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

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
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link").textContent).toEqual("Add a book");
  });

  test("should check the books shelf names", async () => {
    await act(async () => renderWithProviders(<Home />));
    const options = screen.getAllByRole("option") as HTMLOptionElement[];
    expect(options).toHaveLength(5);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
    expect(options[3].selected).toBe(false);
    expect(options[4].selected).toBe(false);
  });

  test("should able to change book's shelf", async () => {
    await act(async () => renderWithProviders(<Home />));
    const selects = await screen.findAllByRole("combobox");

    expect(selects).toBeTruthy;
    expect(selects.length).toBe(1);
    const options = screen.getAllByRole("option") as HTMLOptionElement[];
    expect(options.length).toBe(5);
    await act(() => userEvent.selectOptions(selects[0] as any, options[4]));
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(false);
    expect(options[2].selected).toBe(false);
    expect(options[3].selected).toBe(false);
    expect(options[4].selected).toBe(true);
    // expect(await screen.findAllByRole("combobox")).toBe(0);
  });
});
