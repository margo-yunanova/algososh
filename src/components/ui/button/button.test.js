import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

it("renders button with text", () => {
  const tree = renderer.create(<Button text="Развернуть" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders button without text", () => {
  const tree = renderer.create(<Button text="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders disabled button", () => {
  const tree = renderer
    .create(<Button text="Развернуть" disabled={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders button with loader", () => {
  const tree = renderer
    .create(<Button text="Развернуть" isLoader={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("alert by push button", () => {
  window.alert = jest.fn();
  render(
    <Button text="Развернуть" onClick={() => alert("Button has pushed")} />
  );
  fireEvent.click(screen.getByText("Развернуть"));
  expect(window.alert).toHaveBeenCalledWith("Button has pushed");
});
