import React, { PropsWithChildren } from "react";
import styles from "./container.module.css";

type TContainer = PropsWithChildren<{
  padding: string;
}>;

export const Container: React.FC<TContainer> = ({ children, padding }) => {
  return <div className={styles[padding]}>{children}</div>;
};
