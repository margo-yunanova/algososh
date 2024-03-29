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

export type TSortState = {
  firstIndex?: number;
  secondIndex?: number;
  sortedArray?: number[];
  sortedColumnIndex?: number;
};

export type TStateCallback = (state?: TSortState) => TSortState;
export type TSetState = (state: TStateCallback) => void;

export const bubbleSort = async (
  array: Array<number>,
  direction: Direction,
  setState: TSetState
) => {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      setState((state) => ({
        ...state,
        firstIndex: j,
        secondIndex: j + 1,
      }));
      await delay(DELAY_IN_MS);
      if (compareArrayItems(direction, array, j, j + 1)) {
        swap(array, j, j + 1);
        setState((state) => ({
          ...state,
          sortedArray: [...array],
        }));
      }
    }
    setState((state) => ({ ...state, sortedColumnIndex: i }));
  }
  setState(() => ({
    sortedArray: [...array],
    firstIndex: undefined,
    secondIndex: undefined,
    sortedColumnIndex: 0,
  }));
};

export const selectionSort = async (
  array: Array<number>,
  direction: Direction,
  setState: TSetState
) => {
  for (let i = 0; i < array.length - 1; i++) {
    setState((state) => ({
      ...state,
      firstIndex: i,
    }));
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      await delay(DELAY_IN_MS);
      setState((state) => ({
        ...state,
        secondIndex: j,
      }));
      if (compareArrayItems(direction, array, minIndex, j)) {
        minIndex = j;
      }
    }
    swap(array, i, minIndex);
    setState((state) => ({
      ...state,
      sortedArray: [...array],
      sortedColumnIndex: i,
    }));
  }
  setState(() => ({
    sortedArray: [...array],
    firstIndex: undefined,
    secondIndex: undefined,
    sortedColumnIndex: array.length - 1,
  }));
};

export const selectionSort2 = async (
  array: Array<number>,
  direction: Direction,
  setData: any
) => {
  const state: TSortState = {
    firstIndex: undefined,
    secondIndex: undefined,
    sortedArray: array,
    sortedColumnIndex: undefined,
  };
  for (let i = 0; i < array.length - 1; i++) {
    state.firstIndex = i;
    setData({ ...state });
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      await delay(DELAY_IN_MS);
      state.secondIndex = j;
      setData({ ...state });
      if (compareArrayItems(direction, array, minIndex, j)) {
        minIndex = j;
      }
    }
    swap(array, i, minIndex);
    state.sortedArray = [...array];
    state.sortedColumnIndex = i;
    setData({ ...state });
  }

  setData((state: TSetState) => ({
    sortedArray: [...array],
    firstIndex: undefined,
    secondIndex: undefined,
    sortedColumnIndex: array.length - 1,
  }));
};

export const SortingPage: FC = () => {
  type TSortingAlgorithm = "selectionSort" | "bubbleSort";

  const [checkedRadioButton, setCheckedRadioButton] =
    useState<TSortingAlgorithm>("selectionSort");
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [{ firstIndex, secondIndex, sortedArray, sortedColumnIndex }, setData] =
    useState<TSortState>(() => ({
      firstIndex: undefined,
      secondIndex: undefined,
      sortedArray: randomArr(3, 17, 100),
      sortedColumnIndex: undefined,
    }));

  const sort = async (direction: Direction) => {
    if (checkedRadioButton === "bubbleSort") {
      await bubbleSort(sortedArray!, direction, setData);
    } else {
      await selectionSort(sortedArray!, direction, setData);
    }
  };

  const setRadioInputHandler = (buttonName: TSortingAlgorithm) => {
    setActiveButton(null);
    setData((state) => ({ ...state, sortedColumnIndex: undefined }));
    setCheckedRadioButton(buttonName);
  };

  const setDirectionHandler = async (direction: Direction) => {
    setData((state) => ({ ...state, sortedColumnIndex: undefined }));
    setActiveButton(direction);
    await sort(direction);
    setActiveButton(null);
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
              setData((state) => ({
                ...state,
                sortedArray: randomArr(3, 17, 100),
                sortedColumnIndex: undefined,
              }));
            }}
          />
        </nav>
        <div className={styles.array}>
          {sortedArray?.length &&
            sortedArray.map((number, index) => (
              <Column
                state={getColumnState(index)}
                index={number}
                key={index}
              />
            ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
