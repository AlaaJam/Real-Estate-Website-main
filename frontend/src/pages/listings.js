import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import {
  HeaderContainer,
  ListingItemContainer,
  // AdvancedSearchContainer,
  FooterContainer,
} from "../containers";
import { Section } from "../components";
import { getPropertyList } from "../redux/actions/propertiesAction";

/* --- simple local wrappers to center content --- */
const PageWrap = styled.div`
  width: min(1200px, 92%);
  margin: 0 auto;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;   /*  center the row */
  gap: 24px;                 /* even spacing between cards */
`;

const Listing = () => {
  const dispatch = useDispatch();
  const listProperties = useSelector((state) => state.propertyList);
  const properties = listProperties?.properties || [];

  useEffect(() => {
    dispatch(getPropertyList());
  }, [dispatch]);

  return (
    <>
      <HeaderContainer bg="false" />

      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          {/* If you’re not using the left filter, drop it so centering is perfect */}
          {/* <Section.FlexItem width="30%" relative flexStart>
            <Section.Shadow>
              <AdvancedSearchContainer />
            </Section.Shadow>
          </Section.FlexItem> */}

          <PageWrap>
            <Section.Title style={{ textAlign: "center" }}>
              Our Property List
            </Section.Title>

            <Cards>
              {properties.map((featured) => (
                <ListingItemContainer
                  key={featured.id}
                  featured={featured}
                  width="32%"   /* keep same sizing, now centered */
                />
              ))}
            </Cards>

            <Section.Footer style={{ display: "flex", justifyContent: "center" }}>
              <Section.Button>More Listing</Section.Button>
            </Section.Footer>
          </PageWrap>
        </Section.InnerContainer>
      </Section>

      <FooterContainer />
    </>
  );
};

export default Listing;
