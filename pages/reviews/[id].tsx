import styled from "@emotion/styled";
import { getReview } from "api/review";
import { getList } from "api/list";
import ReviewPost from "types/ReviewPost";
import { Card, CardProps } from "components/Card";
import { Header } from "components/Header";
import { Frame } from "components/Frame";

interface ReviwePageProps extends ReviewPost {}

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 48px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 32px;
  font-weight: 900;
`;

const Content = styled.div`
  white-space: pre-line;
  line-height: 2;
`;

const Image = styled.div<{ hash: number }>`
  background-color: rgba(
    230,
    230,
    ${({ hash }) => {
      return 220 + hash * 20;
    }}
  );
  width: 100%;
  padding-top: 100%;
  margin-bottom: 24px;
`;

const Album = styled.h3`
  font-size: 1.3rem;
  font-weight: 900;
  margin-bottom: 12px;
`;
const Artist = styled.h3`
  font-size: 1.2rem;
  font-weight: 900;
`;

const MetaBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviwePage: React.FC<ReviwePageProps> = ({
  title,
  content,
  album,
  artist,
  date,
}) => {
  return (
    <Frame>
      <Header />
      <Main>
        <div>
          <MetaBox>
            <Image hash={Math.random()} />
            <Album>{album}</Album>
            <Artist>{artist}</Artist>
          </MetaBox>
        </div>
        <section>
          <Title>{title}</Title>
          <Content dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      </Main>
    </Frame>
  );
};

export default ReviwePage;

export const getStaticProps = async ({ params }) => {
  const reviewData = getReview(params.id);
  return { props: reviewData };
};

export async function getStaticPaths() {
  const { list } = getList();

  return {
    paths: list.map(({ id }) => {
      return {
        params: {
          id: `${id}`,
        },
      };
    }),
    fallback: false,
  };
}
