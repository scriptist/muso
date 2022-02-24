import React from "react";
import { css, cx } from "@emotion/css";
import search from "../images/search.svg";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

export default function FilterBox({ onChange, value }: Props) {
  return (
    <div className={styles.root}>
      <input
        type="search"
        className={cx(styles.input, { empty: value === "" })}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {value !== "" && (
        <button className={styles.clearButton} onClick={() => onChange("")}>
          &times;
        </button>
      )}
    </div>
  );
}

// Styles

const styles = {
  root: css`
    margin: 0 auto var(--gutter);
    max-width: var(--menu-width);
    position: relative;
  `,
  input: css`
    border: 1px solid black;
    font: inherit;
    font-size: var(--font-size-large);
    padding: 0.5em calc(20px + 0.5em) 0.5em 0.5em;
    width: 100%;

    &.empty {
      background: url(${search}) 98% 50% no-repeat;
      background-size: 20px;
    }
  `,
  clearButton: css`
    background: none;
    border: none;
    bottom: 0;
    cursor: pointer;
    font: inherit;
    font-size: 24px;
    padding: 0 0 4px;
    position: absolute;
    right: 0;
    top: 0;
    width: 44px;
  `,
};
