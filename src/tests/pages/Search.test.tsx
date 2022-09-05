import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Search from "../../pages/Search";
import { renderWithProviders } from "../../utils/test-utils";
import mockFetch from "../mocks/mockFetch";
beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch as jest.Mock);
  // global.Headers = () => ({
  //   Authorization: "zjbuspe9",
  // });
});

afterEach(() => {
  // jest.restoreAllMocks();
});
describe("test Search Page", () => {
  test("should render The Search page", () => {
    renderWithProviders(<Search />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link").textContent).toEqual("Close");
    expect(screen.getAllByPlaceholderText("Search by title, author, or ISBN"))
      .toBeInTheDocument;
    expect(screen.getByRole("paragraph")).toBeInTheDocument;
    expect(screen.getByRole("paragraph").textContent).toEqual(
      "Search by title, author, or ISBN to view more books."
    );
  });
  test("should able to type in input", async () => {
    renderWithProviders(<Search />);
    const inputFeild = screen.getByPlaceholderText(
      "Search by title, author, or ISBN"
    );
    fireEvent.click(inputFeild);
    fireEvent.change(inputFeild, { target: { value: "react" } });
    await waitForElementToBeRemoved(screen.getByRole("paragraph"));
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
  });
});
