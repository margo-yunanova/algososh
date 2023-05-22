import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Container } from "../content/container";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { delay, randomArr } from "../../constants/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./LinkedList";

export const ListPage: React.FC = () => {
  const [linkedList, setLinkedList] = useState(
    () =>
      new LinkedList<string>(
        randomArr(4, 6, 100).map((item) => item.toString())
      )
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>(-1); //TODO неконтролируемый инпут, строка?
  const [dataForVisualization, setDataForVisualization] = useState<
    Array<string>
  >([...linkedList]);
  const [modifiedItem, setModifiedItem] = useState<number | null>(null);
  const [head, setHead] = useState<"head" | React.ReactElement | null>("head");
  const [tail, setTail] = useState<"tail" | React.ReactElement | null>("tail"); //ПЕРЕИМЕНОВАТЬ
  const [insertItem, setInsertItem] = useState<number | null>(null);
  const lastIndexDataForVisualization = dataForVisualization.length - 1;

  const submitPrepend: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      linkedList.prepend(inputValue);
      setHead(
        <Circle
          isSmall={true}
          letter={inputValue}
          state={ElementStates.Changing}
        />
      );
      await delay(2000);
      setDataForVisualization([...linkedList]);
      setModifiedItem(0);
      setHead("head");
      await delay(2000);
      setModifiedItem(null);
      setInputValue("");
    }
  };

  const submitAddByIndex: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputValue !== "" && inputIndex !== -1) {
      linkedList.addByIndex(inputValue, inputIndex);
      setTail(
        <Circle
          isSmall={true}
          letter={inputValue}
          state={ElementStates.Changing}
        />
      );

      for (let i = 0; i <= inputIndex; i++) {
        setInsertItem(i);
        await delay(SHORT_DELAY_IN_MS);
      }
      setInsertItem(null);
      setTail(null);
      setDataForVisualization([...linkedList]);
      setModifiedItem(inputIndex);
      await delay(SHORT_DELAY_IN_MS);
      setModifiedItem(null);
      setInputValue("");
      setInputIndex(-1);
    }
  };

  const getState = (index: number) => {
    if (insertItem !== null && index < insertItem && inputIndex > -1) {
      return ElementStates.Changing;
    } else if (index === modifiedItem) {
      return ElementStates.Modified;
    } else {
      return ElementStates.Default;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <Container padding={"queuePage"}>
        <div className={styles.forms}>
          <form className={styles.form} onSubmit={submitPrepend}>
            <Input
              extraClass={styles.input}
              placeholder="Введите значение"
              maxLength={4}
              value={inputValue}
              type="text"
              isLimitText={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
              }}
            />
            <Button
              text="Добавить в head"
              type="submit"
              disabled={inputValue === ""}
              linkedList="small"
            />
            <Button
              text="Добавить в tail"
              type="button"
              disabled={inputValue === ""}
              linkedList="small"
              onClick={async () => {
                linkedList.append(inputValue);
                setInsertItem(lastIndexDataForVisualization);
                setTail(
                  <Circle
                    isSmall={true}
                    letter={inputValue}
                    state={ElementStates.Changing}
                  />
                );
                await delay(2000);
                setTail(null);
                setDataForVisualization([...linkedList]);
                setModifiedItem(lastIndexDataForVisualization + 1);
                await delay(2000);
                setModifiedItem(null);
                setInsertItem(null);
                setInputValue("");
              }}
            />
            <Button
              text="Удалить из head"
              type="button"
              //disabled={queue.isEmpty()}
              linkedList="small"
              onClick={() => {
                linkedList.deleteHead();
                setDataForVisualization([...linkedList]);
              }}
            />
            <Button
              text="Удалить из tail"
              type="button"
              //disabled={queue.isEmpty()}
              linkedList="small"
              onClick={() => {
                linkedList.deleteTail();
                setDataForVisualization([...linkedList]);
              }}
            />
          </form>
          <form className={styles.form} onSubmit={submitAddByIndex}>
            <Input
              extraClass={styles.input}
              placeholder="Введите индекс"
              value={inputIndex === -1 ? "" : inputIndex}
              type="number"
              step={1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputIndex(+e.target.value); //TODO контролируемый инпут
              }}
            />
            <Button
              text="Добавить по индексу"
              type="submit"
              disabled={inputIndex === -1 || inputValue === ""}
              linkedList="big"
            />
            <Button
              text="Удалить по индексу"
              type="button"
              disabled={inputIndex === -1}
              linkedList="big"
              onClick={() => {
                linkedList.deleteByIndex(inputIndex);
                setDataForVisualization([...linkedList]);
              }}
            />
          </form>
        </div>
        <div className={styles.circle}>
          {dataForVisualization.map((value, index) => (
            <div key={index} className={styles.circleBlock}>
              <Circle
                letter={value.toString()}
                index={index}
                head={index === insertItem ? tail : index === 0 ? head : null}
                //tail={index === lastIndexDataForVisualization ? tail : null}
                state={getState(index)}
              />
              {lastIndexDataForVisualization !== index && <ArrowIcon />}
            </div>
          ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
