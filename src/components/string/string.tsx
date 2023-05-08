import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Container } from "../content/container";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { delay, swap } from "../../constants/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
//TODO верстка - не вмещается по ширине экрана
export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueAsArray, setInputValueAsArray] =
    useState<Array<string> | null>(null);
  const [firstIndex, setFirstIndex] = useState<number | undefined>(undefined);
  const [secondIndex, setSecondIndex] = useState<number | undefined>(undefined);
  const [hasStartedReverseInput, setStartReverseInput] = useState(false);

  const reverseInput = async (input: string) => {
    const array = input.split("");
    let lastIndex = array.length - 1;
    setStartReverseInput(true);
    for (let i = 0; i < array.length / 2; i++) {
      setFirstIndex(i);
      setSecondIndex(lastIndex);
      swap(array, i, lastIndex);
      setInputValueAsArray([...array]);
      await delay(DELAY_IN_MS);
      lastIndex--;
    }
    setStartReverseInput(false);
  };

  const getCircleState = (
    index: number,
    firstIndex: number | undefined,
    secondIndex: number | undefined
  ): ElementStates | undefined => {
    if (firstIndex === undefined || secondIndex === undefined)
      return ElementStates.Default;
    if (hasStartedReverseInput) {
      if (index === firstIndex || index === secondIndex)
        return ElementStates.Changing;

      if (index < firstIndex || index > secondIndex)
        return ElementStates.Modified;
    } else {
      if (index <= firstIndex || index >= secondIndex)
        return ElementStates.Modified;
    }
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setFirstIndex(undefined);
    setSecondIndex(undefined);
    setInputValueAsArray((inputValue as string).split(""));
    await delay(DELAY_IN_MS);
    reverseInput(inputValue);
  };

  return (
    <SolutionLayout title="Строка">
      <Container padding="stringPage">
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            maxLength={11}
            isLimitText={true}
            value={inputValue}
            name="input"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={hasStartedReverseInput}
          />
        </form>
        <div className={styles.circle}>
          {inputValueAsArray &&
            inputValueAsArray.map((letter, index) => (
              <Circle
                letter={letter}
                key={index}
                state={getCircleState(index, firstIndex, secondIndex)}
              />
            ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
