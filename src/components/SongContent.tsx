import React from "react";
import { css } from "@emotion/css";
import SongChords from "./SongChords";
import { SongType } from "../songs";
import type { Song } from "../songs";

interface Props {
  song: Song;
}

export default function SongContent({ song }: Props) {
  switch (song.type) {
    case SongType.Chords:
      return <SongChords song={song} />;
    case SongType.Lyrics:
      return <div className={styles.lyrics}>{song.lyrics}</div>;
    case SongType.Pdf:
      return (
        <div>
          <iframe
            className={styles.pdfIframe}
            frameBorder="0"
            src={`https://docs.google.com/gview?url=http://muso.mikeyberman.com${song.pdfUrl}&embedded=true`}
            title={song.title}
          />
        </div>
      );
  }
}

// Styles

const styles = {
  lyrics: css`
    font-size: var(--font-size-large);
    line-height: 1.6;
    margin: 0;
    padding: calc(var(--gutter) / 2);
    white-space: pre-wrap;
  `,
  pdfIframe: css`
    height: calc(100vh - 88px);
    width: 100%;
  `,
};
