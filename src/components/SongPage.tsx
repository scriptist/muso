import React from "react";
import { css } from "@emotion/css";
import BackButton from "./BackButton";
import SongContent from "./SongContent";
import type { Song } from "../songs";

interface Props {
  song: Song;
}

export default function SongPage({ song }: Props) {
  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <BackButton className={styles.headerBackButton} />
        <h1 className={styles.headerTitle}>{song.title}</h1>
        <div className={styles.headerArtist}>{song.artist}</div>
        <div className={styles.headerLabel}>{song.type}</div>
      </header>
      <SongContent song={song} />
    </article>
  );
}

// Styles

const styles = {
  root: css`
    margin-top: -10px;
  `,
  header: css`
    border-bottom: 1px solid;
    margin-top: calc(-var(--gutter) / 2);
    padding: calc(var(--gutter) / 2);
    position: relative;
  `,
  headerBackButton: css`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  `,
  headerTitle: css`
    font-weight: inherit;
    font-size: var(--font-size-large);
    margin-bottom: 0.4em;
    margin-top: 0;
    margin-left: 30px;
    margin-right: 65px;
  `,
  headerArtist: css`
    font-size: var(--font-size-small);
    margin-left: 30px;
    margin-right: 65px;
  `,
  headerLabel: css`
    border: 1px solid;
    font-size: var(--font-size-tiny);
    padding: 0.2em 0.3em;
    text-transform: uppercase;
    position: absolute;
    right: calc(var(--gutter) / 2);
    top: 50%;
    transform: translateY(-50%);
  `,
};
