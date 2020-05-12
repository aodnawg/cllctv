import styled from "@emotion/styled";

const StyledCard = styled.div`
  /* box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.3); */
`;

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

const Title = styled.h2`
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const Datetime = styled.div`
  color: #888888;
  font-size: 0.8rem;
  text-align: right;
`;

export interface CardProps {
  title: string;
  date: string;
  id: number;
}

export const Card: React.FC<CardProps> = ({ title, date }) => {
  return (
    <StyledCard>
      <StyledCardImage hash={Math.random()} />
      <Title>{title}</Title>
      <Datetime>{date}</Datetime>
    </StyledCard>
  );
};
