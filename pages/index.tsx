import styled from "@emotion/styled";
import { getList } from "api/list";
import ReviewPost from "types/ReviewPost";
import { Header } from "components/Header";
import { Frame } from "components/Frame";
import { ReviewList } from "components/ReviewList";

type ReviewPostListItem = Omit<ReviewPost, "artist" | "album" | "content">;

const StyledMain = styled.main`
  font-size: 1rem;
`;

const Main: React.FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

interface HomePageProps {
  list: ReviewPostListItem[];
  total: number;
}

const HomePage: React.FC<HomePageProps> = ({ list, total }) => {
  return (
    <Frame>
      <Header />
      <Main></Main>
      <ReviewList list={list} />
    </Frame>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const listData = getList();
  return { props: listData };
};
