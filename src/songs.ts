export enum SongType {
  Chords = "CHORDS",
  Lyrics = "LYRICS",
  Pdf = "PDF",
}

export interface Chords {
  type: SongType.Chords;
  title: string;
  artist: string;
  chords: string;
}

export interface Lyrics {
  type: SongType.Lyrics;
  title: string;
  artist: string;
  lyrics: string;
}

export interface Pdf {
  type: SongType.Pdf;
  title: string;
  artist: string;
  pdfUrl: string;
}

export type Song = Chords | Lyrics | Pdf;

const resolve = require.context("./data/songs", false, /\.txt$/);

const songs: Map<string, Song> = new Map();

resolve.keys().forEach((filename) => {
  const songData = resolve(filename);
  const match = filename.match(/^\.\/(.+)\.txt$/);
  if (!match) {
    throw new Error("Could not get song title");
  }
  const key = match[1];

  let song: Song | null = null;
  if (songData.attributes.pdf != null) {
    song = {
      type: SongType.Pdf,
      title: songData.attributes.title,
      artist: songData.attributes.artist,
      pdfUrl: require(`./data/sheets/${songData.attributes.pdf}`),
    };
  } else if (songData.attributes.type === "lyrics") {
    song = {
      type: SongType.Lyrics,
      title: songData.attributes.title,
      artist: songData.attributes.artist,
      lyrics: songData.body.replace(/^(\r?\n|\r)+|(\r?\n|\r)+$/g, ""),
    };
  } else {
    song = {
      type: SongType.Chords,
      title: songData.attributes.title,
      artist: songData.attributes.artist,
      chords: songData.body.replace(/^(\r?\n|\r)+|(\r?\n|\r)+$/g, ""),
    };
  }

  songs.set(key, song);
});

export default songs;
