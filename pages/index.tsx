import Link from "next/link";
import styled from "@emotion/styled";
import { getList } from "api/list";
import ReviewPost from "types/ReviewPost";
import { Card, CardProps } from "components/Card";
import { Header } from "components/Header";
import { Frame } from "components/Frame";

type ReviewPostListItem = Omit<ReviewPost, "artist" | "album" | "content">;

const StyledMain = styled.main`
  font-size: 1rem;
`;

const Main: React.FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  background-color: #111111;
  color: #ffffff;
  padding: 8px 16px;
  font-size: 1.2rem;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
`;

const Gird = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 64px;

  a {
    color: #222222;
    text-decoration: none;
  }
`;

const Page: React.FC<{ list: CardProps[] }> = ({ list }) => {
  return (
    <Gird>
      {list.map((item) => (
        <Link href="/reviews/[id]" as={`/reviews/${item.id}`} key={item.id}>
          <a>
            <Card {...item} />
          </a>
        </Link>
      ))}
    </Gird>
  );
};

const makePage = (offset: number, list: any[]) => {
  const args = [15 * offset, 15 * offset + 15];
  return <Page list={list.slice(args[0], args[1])} />;
};

interface HomePageProps {
  list: ReviewPostListItem[];
  total: number;
}

const HomePage: React.FC<HomePageProps> = ({ list: list_, total }) => {
  return (
    <Frame>
      <Header />
      <Main></Main>
      {makePage(0, list_)}
      <ButtonWrapper>
        <Button>More...</Button>
      </ButtonWrapper>
    </Frame>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const listData = getList();
  return { props: listData };
};
