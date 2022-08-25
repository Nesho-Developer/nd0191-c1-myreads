import Home from "../../pages/Home";
import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import mockFetch from "../mocks/mockFetch";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  global.Headers = () => ({
    Authorization: "zjbuspe9",
  });
  
});

afterEach(() => {
  jest.restoreAllMocks();
});
describe("test Home page", () => {
  test("should render the Home page", async () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/loading .../i)).toBeInTheDocument;
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading .../i));
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
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
  });

  test("should able to change book's shelf", async () => {
    await act(async () => renderWithProviders(<Home />));
    const selects = screen.getAllByRole("combobox");

    expect(selects).toBeTruthy;
    const options = screen.getAllByRole("option", {
      name: "Currently Reading",
    });
    expect(options[2].selected).toBe(false);
    await act(() =>
      fireEvent.change(selects[2], { target: { value: "currentlyReading" } })
    );
    expect(options[2].selected).toBe(true);
  });

  test("should books list be 2 after change first book's shelf to none", async () => {
    await act(async () => renderWithProviders(<Home />));

    const selects = screen.getAllByRole("combobox");
    expect(selects[0]).toBeInTheDocument;

    await act(async () =>
      fireEvent.change(selects[0], { target: { value: "none" } })
    );
    expect(screen.getAllByRole("combobox").length).toBe(3);
  });
});
