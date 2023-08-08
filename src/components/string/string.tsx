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

export const reverseString = async (input: string, setState: any) => {
  const array = input.split("");
  let lastIndex = array.length - 1;
  for (let i = 0; i < array.length / 2; i++) {
    swap(array, i, lastIndex);

    setState({
      firstIndex: i,
      secondIndex: lastIndex,
      data: [...array],
    });

    await delay(DELAY_IN_MS);
    lastIndex--;
  }
};

export const StringComponent: React.FC = () => {
  type TReverseState = {
    firstIndex?: number;
    secondIndex?: number;
    data: string[];
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [{ firstIndex, secondIndex, data }, setDataForVisualization] =
    useState<TReverseState>({
      firstIndex: undefined,
      secondIndex: undefined,
      data: [],
    });

  const [hasStartedReverseInput, setStartReverseInput] = useState(false);

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
    await reverseString(inputValue, setDataForVisualization);
    setStartReverseInput(false);
  };

  return (
    <SolutionLayout title="Строка">
      <Container padding="stringPage">
        <form className={styles.form} onSubmit={submitHandler} data-cy="form">
          <Input
            maxLength={11}
            isLimitText={true}
            value={inputValue}
            name="input"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            data-cy="input"
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={hasStartedReverseInput}
            disabled={inputValue === ""}
            data-cy="button"
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
