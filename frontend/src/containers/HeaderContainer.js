import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import links from "../constants/routes/nav-links";
import { HeaderWrapper, Banner, Jumbotron } from "../components";
import SideNavigationContainer from "./SideNavigationContainer";

const HeaderContainer = ({ bg, source }) => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const location = useLocation();

  // Handle sticky/fixed header safely
  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 80);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close side nav on route change
  useEffect(() => {
    setIsSideOpen(false);
  }, [location.pathname]);

  const toggleSide = useCallback(() => setIsSideOpen(v => !v), []);

  return (
    <Banner bg={bg} source={source}>
      {/* Accessibility: quick skip */}
     

      <HeaderWrapper bg={bg} fixed={false} role="navigation" aria-label="Primary">
        <HeaderWrapper.Container>
          <HeaderWrapper.Title bg={bg}>
            <HeaderWrapper.Link bg={bg} fixed={fixed} to="/">
              Real Home
            </HeaderWrapper.Link>
          </HeaderWrapper.Title>

          <HeaderWrapper.LinksContainer>
            <HeaderWrapper.List links="links" role="menubar">
              {links.map(link => (
                <HeaderWrapper.Item key={link.to} role="none">
                  <HeaderWrapper.Anchor
                    role="menuitem"
                    bg={bg}
                    fixed={fixed}
                    to={link.to}
                  >
                    {link.name}
                  </HeaderWrapper.Anchor>
                </HeaderWrapper.Item>
              ))}
            </HeaderWrapper.List>

            <HeaderWrapper.List>
              <HeaderWrapper.Item>
                <HeaderWrapper.Anchor to="/profile" special="true">
                  Profile
                </HeaderWrapper.Anchor>
              </HeaderWrapper.Item>
            </HeaderWrapper.List>

            <HeaderWrapper.List side="side">
              <HeaderWrapper.Item>
                <HeaderWrapper.Button
                  aria-label="Open menu"
                  aria-controls="mobile-menu"
                  aria-expanded={isSideOpen}
                  onClick={toggleSide}
                >
                  <HeaderWrapper.Icon name="fa fa-bars" aria-hidden="true" />
                </HeaderWrapper.Button>
              </HeaderWrapper.Item>
            </HeaderWrapper.List>
          </HeaderWrapper.LinksContainer>
        </HeaderWrapper.Container>
      </HeaderWrapper>

      {bg === "true" && (
        <Jumbotron>
          <Jumbotron.Left>
            <Jumbotron.Title>Find the home you deserve</Jumbotron.Title>
            <Jumbotron.Text>
              Browse curated listings and contact trusted agents.
            </Jumbotron.Text>
            {/* If you want the search later, just uncomment: */}
            {/* <AdvancedSearchContainer /> */}
          </Jumbotron.Left>
          <Jumbotron.Right />
        </Jumbotron>
      )}

      {/* Dim background when side nav is open (click to close) */}
      {isSideOpen && (
        <div
          className="overlay"
          onClick={toggleSide}
          aria-hidden="true"
        />
      )}

      <SideNavigationContainer
        sideNavShown={isSideOpen}
        sideNavHidden={!isSideOpen}
        setSideNavHidden={(v) => setIsSideOpen(!v)}
        setSideNavShown={setIsSideOpen}
      />
    </Banner>
  );
};

export default HeaderContainer;
