import styled from "@emotion/styled";

const StyledCard = styled.div``;

const StyledCardImage = styled.div<{ hash: number }>`
  background-color: rgba(
    230,
    230,
    ${({ hash }) => {
      return 220 + hash * 20;
    }}
  );
  width: 100%;
  padding-top: 100%;
  margin-bottom: 16px;
`;

const Title = styled.div`
  background-color: #eeeeee;
  font-size: 0.8rem;
  height: 20px;
  width: 80%;
  margin-bottom: 12px;
`;

const DatetimeWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Datetime = styled.div`
  background-color: #eeeeee;
  width: 60%;
  height: 18px;
`;

export const LoadingCard: React.FC = () => {
  return (
    <StyledCard>
      <StyledCardImage hash={Math.random()} />
      <Title />
      <DatetimeWrapper>
        <Datetime />
      </DatetimeWrapper>
    </StyledCard>
  );
};
