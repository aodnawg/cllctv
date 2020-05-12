// @ts-check

const fs = require("fs");
const path = require("path");
const assert = require("assert");

/**
 * @typedef {object} ReviewPostListItem
 * @property {number} id
 * @property {string} title
 * @property {string} date
 * @property {string} artist
 * @property {string} album
 */

/**
 * @typedef {object} ReviewList
 * @property {number} total
 * @property {Array<ReviewPostListItem>} list
 */

const prjRootPath = path.resolve(__dirname, "..");
const reviewJsonPath = path.resolve(prjRootPath, "posts", "reviews");
const encoding = "utf-8";
const files = fs.readdirSync(reviewJsonPath, { encoding });
const fileNameList = files.filter((f) => f.match(/[0-9]*\.json$/));

/**
 * @param {string} date "yyyy-mm-dd hh:mm:ss"
 */
const reshapeDate = (date) => {
  const num = date
    .replace(/-/g, "")
    .replace(" ", "")
    .replace(/:/g, "");
  return Number(num);
};

/**
 *
 * @param {ReviewPostListItem} a
 * @param {ReviewPostListItem} b
 */
const sortDate = (a, b) => {
  const a_ = a.date;
  const b_ = b.date;
  return reshapeDate(b_) - reshapeDate(a_);
};

/**
 * @param {string} fileName
 * @return {ReviewPostListItem}
 */
const makeListItem = (fileName) => {
  const targetPath = path.resolve(prjRootPath, "posts", "reviews", fileName);
  const jsonData = fs.readFileSync(targetPath, { encoding });
  const { id, title, date, artist, album } = JSON.parse(jsonData);
  return { id, title, date, artist, album };
};

const makeJson = () => {
  const list = fileNameList.map(makeListItem).sort(sortDate);
  console.log(list.map((l) => l.date));

  /** @type ReviewList */
  const listMap = { total: fileNameList.length, list };
  const listJson = JSON.stringify(listMap) + "\n";
  const outPath = path.resolve(prjRootPath, "posts", "list.json");
  fs.writeFileSync(outPath, listJson, { encoding });

  // test
  assert(fs.existsSync(outPath), `[*] failed: ${outPath} does not exits`);
  console.log("[*] done");
};

makeJson();
