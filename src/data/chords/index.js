const context = require.context('./', true, /\.(txt)$/);
const songs = {};

context.keys().forEach((filename) => {
  const slug = filename.match(/^\.\/(.*)\.txt$/)[1];
  if (!slug) {
    throw new Error(`Could not build slug for file ${filename}`);
  } else {
    songs[slug] = context(filename);
  }
});

export default songs;
