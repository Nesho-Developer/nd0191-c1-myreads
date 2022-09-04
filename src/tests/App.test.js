import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import { screen, waitFor } from "@testing-library/react";
import mockFetch from "./mocks/mockFetch";
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

describe("test <App/> Component", () => {
  test("render the root App Component", async () => {
    await act(async () => renderWithProviders(<App />));

    expect(screen.getByText(/MyReads/i)).toBeInTheDocument;

    expect(screen.getAllByRole("heading")).toHaveLength(4);
    expect(screen.getAllByRole("combobox")).toHaveLength(3);

    expect(screen.getByRole("paragraph")).toBeInTheDocument;
  });
});
