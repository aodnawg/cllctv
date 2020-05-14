import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Card, CardProps } from "components/Card";
import { LoadingCard } from "components/LoadingCard";

const Gird = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 64px;
  margin-bottom: 64px;

  a {
    color: #222222;
    text-decoration: none;
  }
`;

export const LoadingPage = React.forwardRef<HTMLDivElement>((_, ref) => (
  <Gird ref={ref}>
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </Gird>
));

export const Page: React.FC<{ list: CardProps[] }> = ({ list }) => {
  console.log("render");
  return (
    <Gird>
      {list.map(item => (
        <Link href="/reviews/[id]" as={`/reviews/${item.id}`} key={item.id}>
          <a>
            <Card {...item} />
          </a>
        </Link>
      ))}
    </Gird>
  );
};
