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
  const [linkedList] = useState(
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
  const [tail, setTail] = useState<React.ReactElement | null>(null);
  const [insertItem, setInsertItem] = useState<number | null>(0);
  const [deletedItem, setDeletedItem] = useState<number | null>(null);
  const [deleteByIndex, setDeleteByIndex] = useState<boolean>(false);
  const [currentAnimation, setCurrentAnimation] = useState<
    | "prepend"
    | "append"
    | "addByIndex"
    | "deleteByIndex"
    | "deleteHead"
    | "deleteTail"
    | null
  >(null);
  const lastIndexDataForVisualization = dataForVisualization.length - 1;

  const submitPrepend: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputValue === "") return;
    setCurrentAnimation("prepend");
    linkedList.prepend(inputValue);
    setInsertItem(0);
    setHead(
      <Circle
        isSmall={true}
        letter={inputValue}
        state={ElementStates.Changing}
      />
    );
    await delay(SHORT_DELAY_IN_MS);
    setDataForVisualization([...linkedList]);
    setModifiedItem(0);
    setHead("head");
    await delay(SHORT_DELAY_IN_MS);
    setModifiedItem(null);
    setInputValue("");
    setCurrentAnimation(null);
  };

  const submitAddByIndex: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputValue === "" || inputIndex === -1) return;
    setCurrentAnimation("addByIndex");
    linkedList.addByIndex(inputValue, inputIndex);
    setHead(
      <Circle
        isSmall={true}
        letter={inputValue}
        state={ElementStates.Changing}
        extraClass="smallCircle"
      />
    );

    for (let i = 0; i <= inputIndex; i++) {
      setInsertItem(i);
      await delay(SHORT_DELAY_IN_MS);
    }

    setHead(null);
    setDataForVisualization([...linkedList]);
    setModifiedItem(inputIndex);
    await delay(SHORT_DELAY_IN_MS);
    setModifiedItem(null);
    setInputValue("");
    setInputIndex(-1);
    setCurrentAnimation(null);
  };

  const getState = (index: number) => {
    if (
      (insertItem !== null && index < insertItem && inputIndex > -1) ||
      (deletedItem !== null && index <= deletedItem && deleteByIndex)
    ) {
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
          <form
            className={styles.form}
            onSubmit={submitPrepend}
            data-cy="formValue"
          >
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
              data-cy="inputValue"
            />
            <Button
              text="Добавить в head"
              type="submit"
              disabled={inputValue === "" || currentAnimation !== null}
              linkedList="small"
              isLoader={currentAnimation === "prepend"}
              data-cy="addButtonHead"
            />
            <Button
              text="Добавить в tail"
              type="button"
              disabled={inputValue === "" || currentAnimation !== null}
              isLoader={currentAnimation === "append"}
              linkedList="small"
              onClick={async () => {
                setCurrentAnimation("append");
                linkedList.append(inputValue);
                setInsertItem(lastIndexDataForVisualization);
                setHead(
                  <Circle
                    isSmall={true}
                    letter={inputValue}
                    state={ElementStates.Changing}
                  />
                );
                await delay(SHORT_DELAY_IN_MS);
                setHead(null);
                setDataForVisualization([...linkedList]);
                setModifiedItem(lastIndexDataForVisualization + 1);
                await delay(SHORT_DELAY_IN_MS);
                setModifiedItem(null);
                setInsertItem(null);
                setInputValue("");
                setCurrentAnimation(null);
              }}
              data-cy="addButtonTail"
            />
            <Button
              text="Удалить из head"
              type="button"
              disabled={
                dataForVisualization.length === 0 || currentAnimation !== null
              }
              isLoader={currentAnimation === "deleteHead"}
              linkedList="small"
              onClick={async () => {
                setCurrentAnimation("deleteHead");
                setDeletedItem(0);
                setDataForVisualization(["", ...[...linkedList].slice(1)]);
                setTail(
                  <Circle
                    isSmall={true}
                    letter={[...linkedList][0]}
                    state={ElementStates.Changing}
                    extraClass="smallCircle"
                  />
                );
                await delay(SHORT_DELAY_IN_MS);
                setDeletedItem(null);
                setTail(null);
                linkedList.deleteHead();
                setDataForVisualization([...linkedList]);
                setCurrentAnimation(null);
              }}
              data-cy="deleteButtonHead"
            />
            <Button
              text="Удалить из tail"
              type="button"
              disabled={
                dataForVisualization.length === 0 || currentAnimation !== null
              }
              isLoader={currentAnimation === "deleteTail"}
              linkedList="small"
              onClick={async () => {
                setCurrentAnimation("deleteTail");
                setDeletedItem([...linkedList].length - 1);
                setDataForVisualization([...[...linkedList].slice(0, -1), ""]);
                setTail(
                  <Circle
                    isSmall={true}
                    letter={[...linkedList].at(-1)}
                    state={ElementStates.Changing}
                    extraClass="smallCircle"
                  />
                );
                await delay(SHORT_DELAY_IN_MS);
                setDeletedItem(null);
                setTail(null);
                linkedList.deleteTail();
                setDataForVisualization([...linkedList]);
                setCurrentAnimation(null);
              }}
              data-cy="deleteButtonTail"
            />
          </form>
          <form
            className={styles.form}
            onSubmit={submitAddByIndex}
            data-cy="formIndex"
          >
            <Input
              extraClass={styles.input}
              placeholder="Введите индекс"
              value={inputIndex === -1 ? "" : inputIndex}
              type="number"
              step={1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputIndex(+e.target.value); //TODO контролируемый инпут
              }}
              data-cy="inputIndex"
            />
            <Button
              text="Добавить по индексу"
              type="submit"
              disabled={
                inputIndex <= -1 ||
                inputValue === "" ||
                currentAnimation !== null ||
                inputIndex > dataForVisualization.length
              }
              isLoader={currentAnimation === "addByIndex"}
              linkedList="big"
              data-cy="addButtonIndex"
            />
            <Button
              text="Удалить по индексу"
              type="button"
              disabled={
                inputIndex <= -1 ||
                currentAnimation !== null ||
                inputIndex > dataForVisualization.length - 1
              }
              isLoader={currentAnimation === "deleteByIndex"}
              linkedList="big"
              onClick={async () => {
                setCurrentAnimation("deleteByIndex");
                const letter = dataForVisualization[inputIndex];
                setDeleteByIndex(true);
                for (let i = 0; i <= inputIndex; i++) {
                  setDeletedItem(i);
                  await delay(SHORT_DELAY_IN_MS);
                }
                setDataForVisualization(
                  dataForVisualization.map((i, index) =>
                    inputIndex === index ? "" : i
                  )
                );
                setDeletedItem(null);
                setTail(
                  <Circle
                    isSmall={true}
                    letter={letter}
                    state={ElementStates.Changing}
                    extraClass="smallCircle"
                  />
                );
                await delay(SHORT_DELAY_IN_MS);
                setTail(null);
                linkedList.deleteByIndex(inputIndex);
                setDataForVisualization([...linkedList]);
                setInputIndex(-1);
                setDeleteByIndex(false);
                setCurrentAnimation(null);
              }}
              data-cy="deleteButtonIndex"
            />
          </form>
        </div>
        <div className={styles.circle} data-cy="circles">
          {dataForVisualization.map((value, index) => (
            <div key={index} className={styles.circleBlock} data-cy="circle">
              <Circle
                letter={value.toString()}
                index={index}
                head={index === insertItem ? head : index === 0 ? "head" : null}
                tail={
                  index === inputIndex || index === deletedItem
                    ? tail
                    : index === lastIndexDataForVisualization
                    ? "tail"
                    : null
                }
                state={getState(index)}
                extraClass="bigCircle"
              />
              {lastIndexDataForVisualization !== index && <ArrowIcon />}
            </div>
          ))}
        </div>
      </Container>
    </SolutionLayout>
  );
};
