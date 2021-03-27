import React, { useState } from "react"
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"

// Data for navigation pulled from data/links.js
import navigationLinks from "../data/navigation-links.data"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons"

import SocialLinks from "../data/social-links.data";

import Pyroc from "../assets/pyroc.png"

import { loadWeb3 } from "../data/web3.data";

library.add(faTelegram, faTwitter)

const Navigation = styled.nav`
  height: 8vh;
  display: flex;
  background-color: #090909;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 10vw;
  z-index: 10;
  align-self: center;
  position: fixed;
  // position: relative; // If you want the header to be stuck to the top
  width: 80%;
  @media (max-width: 768px) {
    position: fixed;
    height: 8vh;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    -webkit-filter: none;
    filter: none;
  }
`

const Title = styled.div`
font-size: 1.5rem;
text-decoration: none;
font-weight: 600;
display: inline-block;
white-space: nowrap;
margin: 0 1vw;
transition: all 300ms ease-in;
position: relative;
font-family: "Poppins";
cursor: pointer;
`

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;
  padding: 0 5vw;
  @media (max-width: 768px) {
    display: flex;
  }
`

const TitleContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
`

const Navbox = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    width: 100%;
    justify-content: flex-start;
    padding-top: 10vh;
    background-color: #111;
    transition: all 0.3s ease-in;
    top: 8vh;
    left: ${props => (props.open ? "-100%" : "0")};
  }
`

const Hamburger = styled.div`
  background-color: #ddd;
  width: 30px;
  height: 3px;
  transition: all .3s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: #ddd;
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${props =>
    props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.open ? "0" : "1")};
    transform: ${props => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 10px;
  }
`

const NavItem = styled.span`
  text-decoration: none;
  color: #ddd;
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  transition: all 300ms ease-in;
  position: relative;
  font-family: "Poppins";
  font-size: 1.1rem;
  cursor: pointer;
  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: #fd3708;
    height: 3px;
    transition: all 0.2s ease-in-out;
  }

  :hover {
    opacity: 1;
    ::after {
      width: 100%;
    }
  }

  ${(props) => props.isOnPage ? `
  @media(min-width: 768px) {
    :after {
      width: 100%;
    }
  }
  ` : ''}

  ${(props) => props.dontShow ? `
  font-weight: 500;
  background: #fd3708;
  background: linear-gradient(90deg, rgba(213,17,17,1) 0%, rgba(196,47,10,1) 63%, rgba(196,73,10,1) 100%);
  padding: 5px 10px;
  border-radius: 4px;
  color: #ddd;
  :after {
    display: none;
  }
  :hover {
    color: #fff;
  }
  ` : ''}

  @media (max-width: 768px) {
    padding: 20px 30px;
    font-size: 1.2rem;
    z-index: 6;
    :hover {
      opacity: 1;
      ::after {
        width: 100%;
      }
    }
  }
`

const LinkContainer = styled(Link)`
  color: #ddd;
  text-decoration: none;
  transition: all 300ms ease;
  :hover {
      color: #fd3708;
  }
  display: flex;
  align-items: center;
`

const Image = styled.img`
  width: 70px;
  height: 65px;
`

const IconContainer = styled.div`
margin-left: 10px;
@media (max-width: 768px) {
    position: relative;
    bottom: -40px;
}
`

const IconData = styled.a`
  margin: 4px;
  text-decoration: none;
  cursor: pointer;
`

const FontAwesomeIconContainer = styled(FontAwesomeIcon)`
  color: #ddd;
  :hover {
    color: #fd3708;
  }
  @media (max-width: 768px) {
    transform: scale(1.2);
    margin: 0 20px;
  }
  transform: scale(0.7);
  :hover {
      transform: translateY(-5px);
  }
  transition: all ease 300ms;
`

const Header = () => {
  let location = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false)
  return (
    <Navigation>
      <TitleContainer>
        <Title>
            <LinkContainer to="/">
              <Image src={Pyroc} />
              Pyroclastic
            </LinkContainer>
        </Title>
      </TitleContainer>
      <Toggle
        navbarOpen={navbarOpen}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        {navbarOpen ? <Hamburger open /> : <Hamburger />}
      </Toggle>
      {navbarOpen ? (
        // Mobile mode
        <Navbox>
          {(navigationLinks.map((link, i) => {
          return(
            <div key={i}>
              <Link to={link.url}>
                <NavItem isOnPage={link.url===location.pathname} key={i} onClick={() => setNavbarOpen(!navbarOpen)}>
                  {link.title}
                </NavItem>
              </Link>
            </div>
          )}))}
            <Link to="/wallet">
              <NavItem id="button-change"dontShow={true} onClick={() => {setNavbarOpen(!navbarOpen); loadWeb3();  } }>
                Connect to MetaMask
              </NavItem>
            </Link>
          <IconContainer>
                <IconData href={SocialLinks.Twitter}>
                    <FontAwesomeIconContainer icon={["fab", "twitter"]} size="2x" />
                </IconData>
                <IconData href={SocialLinks.Telegram}>
                    <FontAwesomeIconContainer icon={["fab", "telegram"]} size="2x" />
                </IconData>
            </IconContainer>
        </Navbox>
      ) : (
          // Desktop mode
          <Navbox open>
            {
            (navigationLinks.map((link, i) => (
              <div key={i}>
                <Link to={link.url}>
                  <NavItem isOnPage={link.url===location.pathname} key={i} onClick={() => setNavbarOpen(!navbarOpen)}>
                    {link.title}
                  </NavItem>
                </Link>
              </div>
            )))} 
            <Link to="/wallet" >
              <NavItem id="button-change" dontShow={true} onClick={() => {setNavbarOpen(!navbarOpen); loadWeb3()}}>
                Connect to MetaMask
              </NavItem>
            </Link>
            <IconContainer>
                <IconData href={SocialLinks.Twitter}>
                    <FontAwesomeIconContainer icon={["fab", "twitter"]} size="2x" />
                </IconData>
                <IconData href={SocialLinks.Telegram}>
                    <FontAwesomeIconContainer icon={["fab", "telegram"]} size="2x" />
                </IconData>
            </IconContainer>
          </Navbox>
        )}
    </Navigation>
  )
}

export default Header