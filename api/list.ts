import fs from "fs";
import path from "path";

export const getList = () => {
  const listJsonPath = path.join(process.cwd(), "posts", "list.json");
  const list = JSON.parse(fs.readFileSync(listJsonPath).toString());
  return list;
};
