// @ts-check

/**
 * @typedef {object} ReviewPost
 * @property {number} id
 * @property {string} title
 * @property {string} date
 * @property {number} author
 * @property {string} article
 * @property {string} artist
 * @property {string} album
 */

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const _ = require("lodash");

const encording = "utf-8";

const postMetaRaw = "wp1_postmeta";
const postRaw = "wp1_post";

const removeInvalidChar = (jsonRawText) => {
  return jsonRawText
    .replace(/\r/g, "")
    .replace(/\n/g, "\\n")
    .replace(/\\'/g, "'")
    .replace(/\t/g, "")
    .replace(//g, "");
};

const getMetaJson = () => {
  const jsonRaw = fs.readFileSync(
    path.resolve(__dirname, "..", "posts", "rawData", `${postMetaRaw}.json`),
    encording
  );
  return JSON.parse(removeInvalidChar(jsonRaw));
};

const metakeys = [
  "article",
  "artist",
  "album",
  "albumImage",
  "release",
  "trackList",
  "amazon",
];

const getMeta = () => {
  const metaMap = getMetaJson();

  const result = metakeys.map((k) =>
    metaMap
      .filter((r) => r.meta_key === k)
      .map(({ post_id, meta_value }) => ({
        id: post_id,
        text: meta_value,
      }))
  );
  return [metakeys, result];
};

const postkeys = ["id", "title", "author", "date"];

const arrengePost = (post) => {
  const [id, title, author, date] = postkeys;
  const { ID, post_title, post_author, post_date } = post;
  return {
    [id]: ID,
    [title]: post_title,
    [author]: post_author,
    [date]: post_date,
  };
};

/**
 * @param {ReviewPost} post
 */
const testEachDateOfReview = (post) => {
  const { id, date } = post;
  const test =
    date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/) !==
    null;
  assert(test, `[*] reviewPost (${id}) has invalid date (${date})`);
  return post;
};

const getPosts = () => {
  const jsonRaw = fs.readFileSync(
    path.resolve(__dirname, "..", "posts", "rawData", `${postRaw}.json`),
    encording
  );
  const posts = JSON.parse(removeInvalidChar(jsonRaw)).filter(
    (r) => r.post_type === "reviews"
  );
  return posts.map(arrengePost).map(testEachDateOfReview);
};

const bindPostAndMeta = (posts, metas) => {
  const [key, values] = metas;
  return posts.map(({ id, ...rest }) => {
    const result = { id, ...rest };
    _.zip(key, values).forEach(([key, values]) => {
      const { text } = values.filter((a) => id === a.id)[0] || { text: "" };
      result[key] = text;
    });
    return result;
  });
};

const makeReviewMaps = () => {
  const posts = getPosts();
  const metas = getMeta(); // [key[], value[]]
  const result = bindPostAndMeta(posts, metas);

  // tests
  result.forEach((r) => {
    const keys = [...metakeys, ...postkeys];
    keys.forEach((k) =>
      assert(k in r, `[*] failed: property ${k} does not exist in ${r.id}`)
    );
  });
  return result;
};

const writeJson = (target) => {
  const name = `${target.id}.json`;
  const filePath = path.resolve(__dirname, "..", "posts", "reviews", name);
  const content = JSON.stringify(target) + "\n";
  fs.writeFileSync(filePath, content, encording);
  console.log(`[*] done. id: ${target.id}, path:${filePath}`);
  return filePath;
};

const makeReviewJsons = () => {
  const reviewMaps = makeReviewMaps();
  const result = reviewMaps.map((review) => {
    return writeJson(review);
  });
  // test
  result.forEach((path) => {
    assert(fs.existsSync(path), `[*] failed: ${path} does not exist.`);
  });
};

makeReviewJsons();
