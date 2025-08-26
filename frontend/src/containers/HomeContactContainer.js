import React from "react";
import styled from "styled-components/macro";
import { Section } from "../components";

/* ---- local styles just for this block ---- */
const CenterWrap = styled.div`
  width: min(1100px, 92%);
  margin: 0 auto;
  text-align: center;
  padding: 200px 0 64px;
`;

const Lead = styled.p`
  margin: 10px auto 28px;
  max-width: 720px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--bs-gray-700, #555);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  justify-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
  padding: 22px 22px 20px;
  text-align: left;

  h3 {
    margin: 0 0 8px;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--bs-gray-900, #222);
  }

  p {
    margin: 0;
    color: var(--bs-gray-700, #555);
    line-height: 1.65;
  }
`;
/* ------------------------------------------ */

const HomeContactContainer = () => {
  return (
    <Section bgColor="--bs-fade-blue">
      <Section.InnerContainer>
        {/* empty header is fine to keep spacing consistent */}
        <Section.Header />

<Section.Content>
  <CenterWrap>
    <Section.SubTitle size="1">Contact Us</Section.SubTitle>

    <Lead>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
      nemo dolorem amet cupiditate sequi cum?
    </Lead>

    <Grid>
      <Card>
        <h3>We Will Get In Touch</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
        </p>
      </Card>

      <Card>
        <h3>Get Instant Support From Us</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
        </p>
      </Card>
    </Grid>
  </CenterWrap>
</Section.Content>

      </Section.InnerContainer>
    </Section>
  );
};

export default HomeContactContainer;
