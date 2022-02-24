import React from "react";
import { Link } from "react-router-dom";
import { css, cx } from "@emotion/css";
import chevronLeft from "../images/chevron-left.svg";

interface Props {
  className?: string;
}

export default function BackButton({ className }: Props) {
  return (
    <Link to="/" className={cx(styles.root, className)}>
      Back
    </Link>
  );
}

// Styles

const styles = {
  root: css`
    background: url(${chevronLeft}) 35% 50% no-repeat;
    background-size: 60%;
    border: 1px solid;
    border-radius: 15px;
    cursor: pointer;
    display: block;
    height: 30px;
    text-indent: -99999px;
    width: 30px;
  `,
};
