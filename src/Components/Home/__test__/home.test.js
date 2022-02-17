import React from "react";
import ReactDOM from "react-dom";
import Home from "../home";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
afterEach(cleanup);
beforeAll(() => {
  console.log("running before all");
});
afterAll(() => {
  console.log("running after all");
});
it("rendered without crash", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Home />, div);
});
