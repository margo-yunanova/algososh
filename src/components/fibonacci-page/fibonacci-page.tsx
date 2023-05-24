import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Container } from "../content/container";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../constants/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(-1);
  const [dataForVisualization, setDataForVisualization] = useState<
    Array<number>
  >([]);
  const [isLoader, setLoader] = useState<boolean>(false);

  const getFibonacciSequence = (number: number): Array<number> => {
    let first = 0;
    let second = 1;
    const fibonacciSequence: Array<number> = [second];
    for (let i = 0; i < number; i++) {
      let third = first + second;
      fibonacciSequence.push(third);
      first = second;
      second = third;
    }
    return fibonacciSequence;
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    setDataForVisualization([]);
    const array = getFibonacciSequence(inputValue as number);
    for (const value of array) {
      setDataForVisualization((state) => [...state, value]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <Container padding={"fibonacciPage"}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            placeholder="Введите текст"
            isLimitText={true}
            maxLength={19}
            value={inputValue === -1 || inputValue === 0 ? "" : inputValue}
            type="number"
            max={19}
            min={1}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(+e.target.value)
            }
          />
          <Button
            text="Рассчитать"
            type="submit"
            isLoader={isLoader}
            disabled={inputValue <= 0 || inputValue > 19}
          />
        </form>
        <div className={styles.circle}>
          {dataForVisualization &&
            dataForVisualization.map((value, index) => (
              <Circle letter={value.toString()} key={index} index={index} />
            ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
