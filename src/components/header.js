import styled from "styled-components"
import React from "react"
import { Link } from "gatsby"

const HeaderBase = styled.header`
  background: var(--porcelain-translucent);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;

  @media (prefers-color-scheme: dark) {
    background: var(--squid-ink-translucent);
    backdrop-filter: blur(10px);
  }
`

const Logo = styled(Link)`
  color: var(--sage);
  display: flex;
  flex-direction: column;
  max-width: 36em;
  margin: 1.25em auto;
  padding: 0 2rem;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  span:first-of-type {
    font-family: "obviously-narrow";
    font-weight: 700;
    letter-spacing: 0.6px;
    line-height: 0.875;
    text-transform: uppercase;
  }

  span:last-of-type {
    font-family: "obviously-extended";
    font-size: 185%;
    line-height: 1;
  }

  &:hover {
    color: var(--aubergine);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--spearmint);

    &:hover {
      color: var(--parchment);
    }
  }
`

const Header = () => {
  return (
    <HeaderBase>
      <Logo aria-label="Site logo">
        <span>Food From</span>
        <span>101</span>
      </Logo>
    </HeaderBase>
  )
}

export default Header
