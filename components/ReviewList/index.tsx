import React, { useRef } from "react";
import { chunk } from "lodash";

import ReviewPost from "types/ReviewPost";
import { Page, LoadingPage, PageProps } from "./Page";
import { useLoading } from "./useLoading";

type ReviewPostListItem = Omit<ReviewPost, "artist" | "album" | "content">;

export interface ReviewListProps {
  list: ReviewPostListItem[];
}

const ITEMS_PER_PAGE = 3;

const MemoisedPage = React.memo(Page, (prev, next) => {
  return prev.list[0].title === next.list[0].title;
});

export const ReviewList: React.FC<ReviewListProps> = ({ list }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const [loading, currentPage] = useLoading(loadingRef);

  const pageList = chunk(list, ITEMS_PER_PAGE);
  const pageArray = [...Array(currentPage)].map((_, i) => i);

  return (
    <div>
      {pageArray.map(i => (
        <MemoisedPage list={pageList[i]} key={i} />
      ))}
      {!loading && <LoadingPage ref={loadingRef} />}
    </div>
  );
};
