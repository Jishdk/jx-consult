import { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Animate.module.css";

interface Props {
  in: boolean;
  children: ReactNode;
}

export default function Animate(props: Props) {
  return (
    <CSSTransition
      in={props.in}
      timeout={300}
      classNames={{
        enter: styles.slideEnter,
        enterActive: styles.slideEnterActive,
        enterDone: styles.slideEnterDone,
        exit: styles.slideExit,
        exitActive: styles.slideExitActive,
        exitDone: styles.slideExitDone,
      }}
    >
      {props.children}
    </CSSTransition>
  );
}
