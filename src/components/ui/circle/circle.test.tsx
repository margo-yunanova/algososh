import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

it("renders circle with letter", () => {
  const tree = renderer.create(<Circle letter="M" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle without letter", () => {
  const tree = renderer.create(<Circle letter="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with head", () => {
  const tree = renderer.create(<Circle head="head" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with head component", () => {
  const tree = renderer
    .create(<Circle head={<Circle isSmall={true} />} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with tail", () => {
  const tree = renderer.create(<Circle tail="tail" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with index", () => {
  const tree = renderer.create(<Circle index={7} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with prop isSmall", () => {
  const tree = renderer.create(<Circle isSmall={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with default state", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with default changing", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders circle with default modified", () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
