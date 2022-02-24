import React from "react";
import { css, cx } from "@emotion/css";
import BackButton from "./BackButton";
import type { Chords } from "../songs";

interface Props {
  song: Chords;
}

export default function SongChords({ song }: Props) {
  return (
    <div className={styles.root}>
      {song.chords.split("\n").map((line, i) => (
        <Line line={line} key={i} />
      ))}
    </div>
  );
}

// Helpers

interface LineProps {
  line: string;
}

function Line({ line }: LineProps) {
  console.log(line);
  return (
    <div className={cx(styles.line, { chords: testLine(line) })}>{line}</div>
  );
}

function testLine(line: string): boolean {
  if (!line) return false;
  if (line.match(/^\s+[A-G][b#]?(m|maj)?[679]?\s/)) return true;
  if (line.match(/^\|:/)) return true;
  if (line.match(/^\| ?[A-G][b#]?(m|maj)[679]? /)) return true;

  const lettersCount = line.split("").filter((char) => char !== " ").length;
  const longestWord = Math.max(...line.split(" ").map((word) => word.length));
  if (lettersCount >= 20 && longestWord > 4) return false;

  const chordRegex = new RegExp(
    "([A-G][b#]?[m]?((6\\/9|11|13|[679]))?" +
      "((dim|dom|aug|sus|min|maj|add|no|m|M|-|\\+)(11|13|15|[23456789])?){0,2}" +
      "([b#\\-\\+][59]){0,2}(\\/[A-G][b#]?)?)(?=(-|/|\\\\|\\)|$))"
  );
  if (line.match(chordRegex)) return true;

  const lineRegex = /^^([A-G][b#]?m?7?\s*)*$/;
  if (line.match(lineRegex)) return true;

  return false;
}

// Styles

const styles = {
  root: css`
    font-family: monospace;
    font-size: var(--font-size-large);
    line-height: 1.4;
    margin: 0;
    padding: calc(var(--gutter) / 2);
    white-space: pre-wrap;
  `,
  line: css`
    &.chords {
      color: #c33;
      line-height: 1;
      margin-top: 0.4em;
    }
  `,
};
