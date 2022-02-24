import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { css, cx } from "@emotion/css";
import FilterBox from "./FilterBox";
import songs from "../songs";
import type { Song } from "../songs";

export default function HomePage() {
  const [filter, setFilter] = useState("");
  const filteredSongs = useFilteredSongs(filter);

  return (
    <div>
      <FilterBox value={filter} onChange={setFilter} />
      {filteredSongs.map(([key, song]) => (
        <SongLink href={`/${key}`} key={key} song={song} />
      ))}
    </div>
  );
}

// Hooks

function useFilteredSongs(filter: string): [string, Song][] {
  const songsEntries = Array.from(songs.entries());
  const normalisedFilter = filter.toLowerCase().trim();

  if (normalisedFilter === "") {
    return songsEntries;
  }

  const filterWords = normalisedFilter.split(" ");
  const filterFields = ["title", "artist"];

  return songsEntries.filter(([, song]) =>
    filterWords.every(
      (word) =>
        song.title.toLowerCase().includes(word) ||
        song.artist.toLowerCase().includes(word)
    )
  );
}

// Helpers

interface SongLinkProps {
  href: string;
  song: Song;
}

function SongLink({ href, song }: SongLinkProps) {
  return (
    <Link className={styles.songLink} to={href}>
      <header className={styles.songLinkHeader}>
        <h1 className={styles.songLinkHeaderTitle}>{song.title}</h1>
        <div className={styles.songLinkHeaderArtist}>{song.artist}</div>
        <div className={styles.songLinkHeaderLabel}>{song.type}</div>
      </header>
    </Link>
  );
}

// Styles

const styles = {
  root: css``,
  songLink: css`
    color: inherit;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: var(--menu-width);
    text-decoration: inherit;

    &:hover {
      background: var(--color-gray-light);
    }
  `,
  songLinkHeader: css`
    border-bottom: 1px solid;
    padding: calc(var(--gutter) / 2);
    position: relative;
  `,
  songLinkHeaderTitle: css`
    font-weight: inherit;
    font-size: var(--font-size-large);
    margin: 0 0 0.4em;
  `,
  songLinkHeaderArtist: css`
    font-size: var(--font-size-small);
    margin-right: 65px;
  `,
  songLinkHeaderLabel: css`
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
