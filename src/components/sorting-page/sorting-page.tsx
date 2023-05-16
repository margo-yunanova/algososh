import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { Container } from "../content/container";
import { FC } from "react";
import {
  compareArrayItems,
  delay,
  randomArr,
  swap,
} from "../../constants/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: FC = () => {
  type TSortingAlgorithm = "selectionSort" | "bubbleSort";

  const [checkedRadioButton, setCheckedRadioButton] =
    useState<TSortingAlgorithm>("selectionSort");
  const [sortedArray, setSortedArray] = useState(() => randomArr());
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [firstIndex, setFirstIndex] = useState<number | undefined>(undefined);
  const [secondIndex, setSecondIndex] = useState<number | undefined>(undefined);
  const [sortedColumnIndex, setSortedColumnIndex] = useState<
    number | undefined
  >(undefined);

  const bubbleSort = async (array: Array<number>, direction: Direction) => {
    for (let i = array.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        setFirstIndex(j);
        setSecondIndex(j + 1);
        await delay(DELAY_IN_MS);
        if (compareArrayItems(direction, array, j, j + 1)) {
          swap(array, j, j + 1);
          setSortedArray([...array]);
        }
      }
      setSortedColumnIndex(i);
    }
    setFirstIndex(undefined);
    setSecondIndex(undefined);
    setSortedColumnIndex(0);
    setActiveButton(null);
  };

  const selectionSort = async (array: Array<number>, direction: Direction) => {
    for (let i = 0; i < array.length - 1; i++) {
      setFirstIndex(i);
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        await delay(DELAY_IN_MS);
        setSecondIndex(j);
        if (compareArrayItems(direction, array, minIndex, j)) {
          minIndex = j;
        }
      }
      swap(array, i, minIndex);
      setSortedArray([...array]);
      setSortedColumnIndex(i);
    }
    setFirstIndex(undefined);
    setSecondIndex(undefined);
    setSortedColumnIndex(array.length - 1);
    setActiveButton(null);
  };

  const sort = (direction: Direction) => {
    if (checkedRadioButton === "bubbleSort") {
      bubbleSort(sortedArray, direction);
    } else {
      selectionSort(sortedArray, direction);
    }
  };

  const setRadioInputHandler = (buttonName: TSortingAlgorithm) => {
    setActiveButton(null);
    setSortedColumnIndex(undefined);
    setCheckedRadioButton(buttonName);
  };

  const setDirectionHandler = (direction: Direction) => {
    setSortedColumnIndex(undefined);
    setActiveButton(direction);
    sort(direction);
  };

  const getColumnState = (index: number): ElementStates | undefined => {
    if (index === firstIndex || index === secondIndex)
      return ElementStates.Changing;
    if (sortedColumnIndex === undefined) return ElementStates.Default;

    const isSortedElement =
      checkedRadioButton === "selectionSort"
        ? index <= sortedColumnIndex
        : index >= sortedColumnIndex;

    if (isSortedElement) return ElementStates.Modified;
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <Container padding={"sortingPage"}>
        <nav className={styles.menu}>
          <div className={`${styles.menuItem} ${styles.menuCheckbox}`}>
            <RadioInput
              label="Выбор"
              name="sortOption"
              value="Выбор"
              onClick={() => setRadioInputHandler("selectionSort")}
              defaultChecked
            />
            <RadioInput
              label="Пузырёк"
              name="sortOption"
              value="Пузырёк"
              onClick={() => setRadioInputHandler("bubbleSort")}
            />
          </div>
          <div className={`${styles.menuItem} ${styles.menuSort}`}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              type="button"
              isLoader={activeButton === Direction.Ascending}
              disabled={activeButton !== null}
              onClick={() => setDirectionHandler(Direction.Ascending)}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              type="button"
              isLoader={activeButton === Direction.Descending}
              disabled={activeButton !== null}
              onClick={() => setDirectionHandler(Direction.Descending)}
            />
          </div>
          <Button
            text="Новый массив"
            disabled={activeButton !== null}
            onClick={() => {
              setSortedColumnIndex(undefined);
              setSortedArray(randomArr());
            }}
          />
        </nav>
        <div className={styles.array}>
          {sortedArray.map((number, index) => (
            <Column state={getColumnState(index)} index={number} key={index} />
          ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
