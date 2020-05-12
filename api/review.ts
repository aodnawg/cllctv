import fs from "fs";
import path from "path";

export const getReview = (id: number) => {
  const jsonPath = path.join(process.cwd(), "posts", "reviews", `${id}.json`);
  const reviewData = JSON.parse(fs.readFileSync(jsonPath).toString());
  return reviewData;
};
