import Link from "next/link";
import styled from "@emotion/styled";

const StyledHeader = styled.header`
  font-size: 3rem;
  font-weight: 900;
  padding: 48px 0;
  margin-bottom: 12px;

  a {
    text-decoration: none;
    color: #222222;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Link href="/">cllctv.</Link>
    </StyledHeader>
  );
};
