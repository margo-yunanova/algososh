import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { Container } from "../content/container";
import { FC } from "react";
import { randomArr } from "../../constants/constants";

const realConsoleLog = console.log;

export const SortingPage: FC = () => {
  const [checkedRadioButton, setCheckedRadioButton] = useState("Выбор");
  const [isLoader, setLoader] = useState(false);
  const [sortedArray, setSortedArray] = useState(() => randomArr());

  const bubbleSort = (arr: Array<number>, direction: Direction) => {
    const array = arr.map((i) => i);
    if (direction === Direction.Ascending) {
      for (let i = array.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (array[j] > array[j + 1]) {
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            console.log(array);
            setSortedArray(array);
          }
        }
      }
    } else {
      for (let i = array.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (array[j] < array[j + 1]) {
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
      }
    }

    setLoader(false);
  };

  const sort = (direction: Direction) => {
    if (checkedRadioButton === "Пузырёк") {
      bubbleSort(sortedArray, direction);
    } else {
    }
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
              onClick={() => {
                setLoader(false);
                setCheckedRadioButton("Выбор");
              }}
              defaultChecked
            />
            <RadioInput
              label="Пузырёк"
              name="sortOption"
              value="Пузырёк"
              onClick={() => {
                setLoader(false);
                setCheckedRadioButton("Пузырёк");
              }}
            />
          </div>
          <div className={`${styles.menuItem} ${styles.menuSort}`}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              type="button"
              isLoader={isLoader}
              onClick={() => {
                setLoader(true);
                sort(Direction.Ascending);
              }}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              type="button"
              onClick={() => {
                setLoader(true);
                sort(Direction.Descending);
              }}
            />
          </div>
          <Button text="Новый массив" />
        </nav>
        <div className={styles.array}>
          {sortedArray.map((number, index) => (
            <Column index={number} key={index} />
          ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
