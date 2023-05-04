import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { Container } from "../content/container";
import { FC } from "react";
import { delay, randomArr, swap } from "../../constants/constants";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

const realConsoleLog = console.log;

export const SortingPage: FC = () => {
  type TSortingAlgorithm = 'selectionSort' | 'bubbleSort';

  const [checkedRadioButton, setCheckedRadioButton] = useState<TSortingAlgorithm>('selectionSort');
  const [isLoader, setLoader] = useState<boolean>();
  const [sortedArray, setSortedArray] = useState(() => randomArr());
  const [activeButton, setActiveButton] = useState<String | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(
    undefined
  );
  const [sortedColumnIndex, setSortedColumnIndex] = useState<number | undefined>(undefined);




  const bubbleSort = async (array: Array<number>, direction: Direction) => {
    if (direction === Direction.Ascending) {
      for (let i = array.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          setCurrentIndex(j);
          await delay(DELAY_IN_MS);
          if (array[j] > array[j + 1]) {
            swap(array, j);
            setSortedArray([...array]);
          }
        }
        setSortedColumnIndex(i);
      }
    } else {
      for (let i = array.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          setCurrentIndex(j);
          await delay(DELAY_IN_MS);
          if (array[j] < array[j + 1]) {
            swap(array, j);
            setSortedArray([...array]);
          }
        }
        setSortedColumnIndex(i);
      }
    }
    setCurrentIndex(undefined);
    setSortedColumnIndex(0);
    setActiveButton(null);
  };

  const sort = (direction: Direction) => {
    if (checkedRadioButton === 'bubbleSort') {
      bubbleSort(sortedArray, direction);
    } else {
    }
  };

  const setRadioInputHandler = (buttonName: TSortingAlgorithm) => {
    setActiveButton(null);
    setCheckedRadioButton(buttonName);
  };

  const setDirectionHandler = (direction: Direction) => {
    setSortedColumnIndex(undefined);
    setActiveButton(direction);
    sort(direction);
  };

  const getColumnState = (index: number): ElementStates | undefined => {
    if (index === currentIndex || index + 1 === currentIndex)
      return ElementStates.Changing;
    if (sortedColumnIndex === undefined) return ElementStates.Default;
    if (index >= sortedColumnIndex) return ElementStates.Modified;
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
              onClick={() => setRadioInputHandler('selectionSort')}
              defaultChecked
            />
            <RadioInput
              label="Пузырёк"
              name="sortOption"
              value="Пузырёк"
              onClick={() => setRadioInputHandler('bubbleSort')}
            />
          </div>
          <div className={`${styles.menuItem} ${styles.menuSort}`}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              type="button"
              isLoader={activeButton === Direction.Ascending}
              onClick={() => setDirectionHandler(Direction.Ascending)}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              type="button"
              isLoader={activeButton === Direction.Descending}
              disabled={
                activeButton === null
                  ? false
                  : activeButton !== Direction.Descending
              } //TODO
              onClick={() => setDirectionHandler(Direction.Descending)}
            />
          </div>
          <Button
            text="Новый массив"
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
