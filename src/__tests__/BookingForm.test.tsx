import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import BookingForm from "../components/BookingForm";
import axios from "axios";
import { mockData } from "./mockData";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(mockData);
});

test("renders BookingForm component", async () => {
  render(<BookingForm />);

  // Wait for the component to fetch data
  await screen.findByLabelText(/select destination/i);

  expect(screen.getByLabelText(/select destination/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of passengers/i)).toBeInTheDocument();
  expect(screen.getByText(/calculate price/i)).toBeInTheDocument();
});

test("displays error message for an invalid destination", async () => {
  render(<BookingForm />);

  // Wait for the component to fetch data
  await screen.findByLabelText(/select destination/i);

  // Select an invalid destination
  fireEvent.change(screen.getByLabelText(/select destination/i), {
    target: { value: "50000 Quaoar" },
  });

  // Enter the number of passengers
  fireEvent.change(screen.getByLabelText(/number of passengers/i), {
    target: { value: "2" },
  });

  // Click the calculate button
  fireEvent.click(screen.getByText(/calculate price/i));

  // Ensure that the error message is displayed
  await waitFor(() => {
    expect(
      screen.getByText(/cannot travel to this destination/i)
    ).toBeInTheDocument();
  });

  // Ensure that the total cost is not displayed
  expect(screen.queryByText(/total cost/i, { exact: false })).toBeNull();
});
