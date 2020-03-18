/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const style = css`
  color: hotpink;
`;

const HomePage = () => {
  const str = "BRAND NEW FUCKING AWESOME cllctv.";
  return <div css={style}>{str}</div>;
};

export default HomePage;
