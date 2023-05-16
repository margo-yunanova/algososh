import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Container } from "../content/container";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../constants/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import Queue from "./Queue";
import { ElementStates } from "../../types/element-states";
//TODO адаптивная верстка

export const QueuePage: React.FC = () => {
  const [queue] = useState(() => new Queue<string>(7));
  const [inputValue, setInputValue] = useState<string>("");
  const [dataForVisualization, setDataForVisualization] = useState<
    Array<string>
  >(Array(7).fill(""));
  const [modifiedItem, setModifiedItem] = useState<number | null>(null);

  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      queue.enqueue(inputValue);
      setModifiedItem(queue.tail - 1);
      await delay(SHORT_DELAY_IN_MS);
      setDataForVisualization([...queue]);
      setInputValue("");
      setModifiedItem(null);
    }
  };
  console.log(queue.length);
  return (
    <SolutionLayout title="Очередь">
      <Container padding={"queuePage"}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            maxLength={4}
            value={inputValue}
            type="text"
            isLimitText={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
          />
          <Button
            text="Добавить"
            type="submit"
            disabled={inputValue === "" || queue.length === 7}
          />
          <Button
            text="Удалить"
            type="button"
            disabled={queue.isEmpty()}
            onClick={async () => {
              setModifiedItem(queue.head);
              await delay(SHORT_DELAY_IN_MS);
              queue.dequeue();
              setDataForVisualization([...queue]);
              setModifiedItem(null);
            }}
          />
          <Button
            text="Очистить"
            type="button"
            disabled={queue.isEmpty()}
            onClick={() => {
              queue.clear();
              setDataForVisualization([...queue]);
            }}
          />
        </form>
        <div className={styles.circle}>
          {dataForVisualization.map((value, index) => (
            <Circle
              letter={value}
              key={index}
              index={index}
              head={!queue.isEmpty() && index === queue.head ? "head" : null}
              tail={
                !queue.isEmpty() && index === queue.tail - 1 ? "tail" : null
              }
              state={
                index === modifiedItem
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
