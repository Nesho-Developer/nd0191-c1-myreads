import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import mockFetch, { booksListResponse } from "./mocks/mockFetch";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch as jest.Mock);
  // window.global.Headers = () => ({
  //   Authorization: "zjbuspe9",
  // });
});

afterEach(() => {
  // jest.restoreAllMocks();
});

describe("test <App/> Component", () => {
  test("render the root App Component", async () => {
    renderWithProviders(<App />);

    expect(screen.getByText(/MyReads/i)).toBeTruthy;
    // jest.setTimeout(5000);
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading .../i));
    expect(screen.getAllByRole("heading")).toHaveLength(4);
    expect(screen.getAllByRole("combobox")).toHaveLength(3);

    expect(screen.getByRole("paragraph")).toBeInTheDocument;
  });
});
