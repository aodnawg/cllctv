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

const getMeta = () => {
  const metaMap = getMetaJson();
  const keys = [
    "article",
    "artist",
    "album",
    "albumImage",
    "release",
    "trackList",
    "amazon",
  ];
  const result = keys.map((k) =>
    metaMap
      .filter((r) => r.meta_key === k)
      .map(({ post_id, meta_value }) => ({
        id: post_id,
        text: meta_value,
      }))
  );
  return [keys, result];
};

const arrengePost = (post) => {
  const { ID, post_title, post_author, post_date } = post;
  return { id: ID, title: post_title, author: post_author, date: post_date };
};

const getPosts = () => {
  const jsonRaw = fs.readFileSync(
    path.resolve(__dirname, "..", "assets", `${postRaw}.json`),
    encording
  );
  const posts = JSON.parse(removeInvalidChar(jsonRaw)).filter(
    (r) => r.post_type === "reviews"
  );
  return posts.map(arrengePost);
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
  return result;
};

const writeJson = (target) => {
  const name = `${target.id}.json`;
  const filePath = path.resolve(__dirname, "..", "posts", "reviews", name);
  const content = JSON.stringify(target);
  fs.writeFileSync(filePath, content, encording);
  console.log(`[*] done: ${filePath}`);
  return filePath;
};

const makeReviewJsons = () => {
  const reviewMaps = makeReviewMaps();

  const result = reviewMaps.map((review) => {
    writeJson(review);
  });

  // test
  result.forEach((path) => {
    assert(
      fs.existsSync(path),
      console.log(`[*] failed: ${path} does not exist.`)
    );
  });
};

makeReviewJsons();
