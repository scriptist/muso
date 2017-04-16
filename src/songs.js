/* eslint-disable no-underscore-dangle */
import data from './data';

const songs = Object.keys(data).sort().map(slug => Object.assign({}, data[slug], {
  slug,
  data: data[slug].__content.replace(/^(\r?\n|\r)+|(\r?\n|\r)+$/g, ''), // Trim line breaks
}));

export default songs;
