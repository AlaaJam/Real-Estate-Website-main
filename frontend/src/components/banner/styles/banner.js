import styled from "styled-components/macro";

export const Main = styled.div`
 position: relative;

  ${({ bg, source }) =>
    bg &&
    ` 
      //  min-height: 100vh;
       background-image:url('${`${source}`}');
  `}
  background-size: cover;
  background-position: center;
  background-repeat: none;
  background-attachment: fixed;
  /* Disable fixed attachment on mobile for performance */
  @media (max-width: 768px) {
    background-attachment: scroll;
  }

  /* gradient overlay for text contrast */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0.55) 0%,
      rgba(0,0,0,0.25) 40%,
     rgba(0,0,0,0.35) 100%
    );
    pointer-events: none;
  }
`;
