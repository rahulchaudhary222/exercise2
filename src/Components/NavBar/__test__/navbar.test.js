import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../navbar";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
afterEach(cleanup);
it("rendered without crash", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NavBar />, div);
});
it("renders correctly", () => {
  const { getByTestId } = render(<NavBar />);
  expect(getByTestId("home_btn")).toHaveTextContent("Home");
});
