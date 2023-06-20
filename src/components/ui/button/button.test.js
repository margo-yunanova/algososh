import renderer from "react-test-renderer";
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
