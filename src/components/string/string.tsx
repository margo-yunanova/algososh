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
//TODO верстка
export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [splitInputValue, setSplitInputValue] = useState<Array<string> | null>(
    null
  );
  const [firstIndex, setFirstIndex] = useState<number | undefined>(undefined);
  const [secondIndex, setSecondIndex] = useState<number | undefined>(undefined);
  const [sortedColumnIndexLeft, setSortedColumnIndexLeft] = useState<
    number | undefined
  >(undefined);
  const [sortedColumnIndexRight, setSortedColumnIndexRight] = useState<
    number | undefined
  >(undefined);

  const reverseInput = async (input: string) => {
    const array = input.split("");

    let lastIndex = array.length - 1;
    for (let i = 0; i < array.length / 2; i++) {
      console.log(
        "итерация ",
        i,
        "i",
        i,
        " lastIndex ",
        lastIndex,
        array[i],
        array[lastIndex]
      );
      setFirstIndex(i);
      setSecondIndex(lastIndex);
      swap(array, i, lastIndex);
      setSplitInputValue([...array]);
      await delay(DELAY_IN_MS);
      lastIndex--;
    }

    // setSortedColumnIndexLeft(Math.floor(array.length / 2) - 1);

    // if (array.length % 2 === 0) {
    //   setSortedColumnIndexRight(array.length / 2);
    // }
  };

  const getCircleState = (
    index: number,
    firstIndex: number | undefined,
    secondIndex: number | undefined
  ): ElementStates | undefined => {
    if (firstIndex === undefined || secondIndex === undefined)
      return ElementStates.Default;

    if (index === firstIndex || index === secondIndex)
      return ElementStates.Changing;

    if (index < firstIndex || index > secondIndex)
      return ElementStates.Modified;

    // if (
    //   (sortedColumnIndexLeft as number) >= index ||
    //   (sortedColumnIndexRight as number) <= index
    // ) {
    //   return ElementStates.Modified;
    // }
  };

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    setFirstIndex(undefined);
    setSecondIndex(undefined);
    setSplitInputValue((inputValue as string).split(""));
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
          <Button text="Развернуть" type="submit" />
        </form>
        <div className={styles.circle}>
          {splitInputValue &&
            splitInputValue.map((letter, index) => (
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
