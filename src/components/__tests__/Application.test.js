import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import Application from "components/Application";

describe("Application", function () {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const axios = jest.fn();

    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
});