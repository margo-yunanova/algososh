import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Container } from "../content/container";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../constants/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
//TODO адаптивная верстка
export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(); //TODO неконтролируемый\контролируемый инпут
  const [inputValueAsArray, setInputValueAsArray] = useState<Array<number>>([]);
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
    setInputValueAsArray([]);
    const array = getFibonacciSequence(inputValue as number);
    for (const value of array) {
      setInputValueAsArray((state) => [...state, value]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <Container padding={"fibonacciPage"}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            maxLength={19}
            value={inputValue}
            type="number"
            max={19}
            min={1}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.valueAsNumber)
            }
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={isLoader}
            // TODO кнопка блокируется если число больше 19
          />
        </form>
        <div className={styles.circle}>
          {inputValueAsArray &&
            inputValueAsArray.map((value, index) => (
              <Circle letter={value.toString()} key={index} index={index} /> //TODO второй ряд начинается слева, а не по центру
            ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
