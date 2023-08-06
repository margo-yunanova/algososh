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

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [{ firstIndex, secondIndex, data }, setDataForVisualization] =
    useState<{
      firstIndex?: number;
      secondIndex?: number;
      data: string[];
    }>({
      firstIndex: undefined,
      secondIndex: undefined,
      data: [],
    });
  const [hasStartedReverseInput, setStartReverseInput] = useState(false);

  const reverseInput = async (input: string) => {
    const array = input.split("");
    let lastIndex = array.length - 1;
    for (let i = 0; i < array.length / 2; i++) {
      swap(array, i, lastIndex);
      setDataForVisualization({
        firstIndex: i,
        secondIndex: lastIndex,
        data: array,
      });
      await delay(DELAY_IN_MS);
      lastIndex--;
    }
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
    setDataForVisualization({
      firstIndex: undefined,
      secondIndex: undefined,
      data: inputValue.split(""),
    });
    setStartReverseInput(true);
    await delay(DELAY_IN_MS);
    await reverseInput(inputValue);
    setStartReverseInput(false);
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
            disabled={inputValue === ""}
          />
        </form>
        <div className={styles.circle}>
          {data.map((letter, index) => (
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
