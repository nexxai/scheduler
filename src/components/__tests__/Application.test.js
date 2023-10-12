import React from "react";
import {
  fireEvent,
  render,
  waitForElement,
  prettyDOM,
  getByTestId,
  queryByTestId,
} from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

describe("Application", function () {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const axios = jest.fn();

    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const axios = jest.fn();

    const {
      getByText,
      getByAltText,
      getAllByAltText,
      getByPlaceholderText,
      container,
      debug,
      getAllByTestId,
      queryByText,
    } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    getAllByTestId("appointment")[0];

    fireEvent.click(getAllByAltText("Add")[0]);

    fireEvent.change(getByPlaceholderText(/enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText("Sylvia Palmer"));

    fireEvent.click(getByText("Save"));

    expect(getByText("Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText("Lydia Miller-Jones"));

    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  it("loads data, books an interview and then cancels the interview", async () => {
    const axios = jest.fn();

    const {
      getByText,
      getByAltText,
      getAllByAltText,
      getByPlaceholderText,
      container,
      debug,
      getAllByTestId,
      queryByText,
    } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    getAllByTestId("appointment")[0];

    fireEvent.click(getAllByAltText("Add")[0]);

    fireEvent.change(getByPlaceholderText(/enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText("Sylvia Palmer"));

    fireEvent.click(getByText("Save"));

    expect(getByText("Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText("Lydia Miller-Jones"));

    fireEvent.click(getAllByAltText("Delete")[0]);

    expect(getByText("Confirm")).toBeInTheDocument();

    fireEvent.click(getByText("Confirm"));

    await waitForElement(() => queryByText("Deleting"));

    expect(queryByText("Lydia Miller-Jones")).not.toBeInTheDocument();
  });

  it("loads data, books an interview and then edits the interview", async () => {
    const axios = jest.fn();

    const {
      getByText,
      getByAltText,
      getAllByAltText,
      getByPlaceholderText,
      container,
      debug,
      getByTestId,
      getAllByTestId,
      queryByText,
      queryByTestId,
    } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    getAllByTestId("appointment")[0];

    fireEvent.click(getAllByAltText("Edit")[0]);

    await waitForElement(() => queryByTestId("student-name-input"));

    expect(getByTestId("student-name-input")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(/enter student name/i), {
      target: { value: "Archie M. Cohen" },
    });

    fireEvent.click(getByText("Save"));

    await waitForElement(() => queryByText("Saving"));

    expect(getByText("Archie M. Cohen")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const {
      getByText,
      getByAltText,
      getAllByAltText,
      getByPlaceholderText,
      container,
      debug,
      getByTestId,
      getAllByTestId,
      queryByText,
      queryByTestId,
    } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    getAllByTestId("appointment")[0];

    fireEvent.click(getAllByAltText("Edit")[0]);

    await waitForElement(() => queryByTestId("student-name-input"));

    expect(getByTestId("student-name-input")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(/enter student name/i), {
      target: { value: "Archie M. Cohen" },
    });

    fireEvent.click(getByText("Save"));

    await waitForElement(() => getByText("Error"));

    expect(getByText("Could not book appointment.")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const {
      getByText,
      getByAltText,
      getAllByAltText,
      getByPlaceholderText,
      container,
      debug,
      getAllByTestId,
      queryByText,
    } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    getAllByTestId("appointment")[0];

    fireEvent.click(getAllByAltText("Delete")[0]);

    expect(getByText("Confirm")).toBeInTheDocument();

    fireEvent.click(getByText("Confirm"));

    await waitForElement(() => queryByText("Deleting"));

    expect(queryByText("Could not cancel appointment.")).toBeInTheDocument();
  });
});
