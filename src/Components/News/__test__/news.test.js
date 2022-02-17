import React from "react";
import ReactDOM from "react-dom";
import News from "../news";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
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
  ReactDOM.render(<News />, div);
});

it("renders correctly", async () => {
  render(<News />);
  const NextButton = await screen.findByTestId("next_btn");
  const PageNumber = await screen.findByTestId("page");
  expect(NextButton).toBeVisible();
  expect(PageNumber).toBeVisible();
});

it("renders all news tiles", async () => {
  render(<News />);
  const newTiles = await screen.findAllByTestId(/news_tile/i);
  expect(newTiles.length).toBe(10);
});
