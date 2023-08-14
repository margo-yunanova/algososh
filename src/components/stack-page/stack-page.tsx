import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Container } from "../content/container";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../constants/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import Stack from "./Stack";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stack] = useState(() => new Stack<string>());
  const [inputValue, setInputValue] = useState<string>("");
  const [dataForVisualization, setDataForVisualization] = useState<
    Array<string>
  >([]);
  const [stateTopOfStack, setStateTopOfStack] = useState<ElementStates>(
    ElementStates.Default
  );
  const indexTopOfStack = stack.getSize() - 1;

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      stack.push(inputValue);
      setDataForVisualization([...stack]);
      setStateTopOfStack(ElementStates.Changing);
      setInputValue("");
      await delay(SHORT_DELAY_IN_MS);
      setStateTopOfStack(ElementStates.Default);
    }
  };

  return (
    <SolutionLayout title="Стек">
      <Container padding={"stackPage"}>
        <form
          className={styles.form}
          onSubmit={submitHandler}
          data-cy="formValue"
        >
          <Input
            maxLength={4}
            value={inputValue}
            type="text"
            isLimitText={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
            data-cy="inputValue"
          />
          <Button
            text="Добавить"
            type="submit"
            disabled={inputValue === ""}
            data-cy="button"
          />
          <Button
            text="Удалить"
            type="button"
            disabled={dataForVisualization.length === 0}
            onClick={async () => {
              setStateTopOfStack(ElementStates.Changing);
              await delay(SHORT_DELAY_IN_MS);
              stack.pop();
              setDataForVisualization([...stack]);
              setStateTopOfStack(ElementStates.Default);
            }}
            data-cy="deleteButton"
          />
          <Button
            text="Очистить"
            type="button"
            disabled={dataForVisualization.length === 0}
            onClick={() => {
              stack.clear();
              setDataForVisualization([...stack]);
            }}
            data-cy="clearButton"
          />
        </form>
        <div className={styles.circle}>
          {dataForVisualization.map((value, index) => (
            <Circle
              letter={value}
              key={index}
              index={index}
              head={index === indexTopOfStack ? "top" : null}
              state={
                index === indexTopOfStack
                  ? stateTopOfStack
                  : ElementStates.Default
              }
            />
          ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
