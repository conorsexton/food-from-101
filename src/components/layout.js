import React, { useState } from "react"
import { MDXProvider } from "@mdx-js/react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import "./layout.css"
import { light, dark } from "../global-themes"
import * as GlobalElements from "../components/shared"

const Global = createGlobalStyle`
  :root {
    /* Light Theme Colors */
    --porcelain: hsla(185, 100%, 95%, 1);
    --porcelain-translucent: hsla(185, 100%, 95%, 0.9);
    --ripe-tomato: hsla(5, 100%, 60%, 1);
    --aubergine: hsla(233, 57%, 18%, 1);
    --sage: hsla(185, 22%, 78%, 1);
    --kale: hsla(171, 52%, 20%, 1);

    /* Dark Theme Colros */
    --squid-ink: hsla(159, 33%, 7%, 1);
    --squid-ink-translucent: hsla(159, 33%, 7%, 0.95);
    --spearmint: hsla(171, 33%, 40%, 1);
    --vodka-sauce: hsla(11, 91%, 61%, 1);
    --sherbert: hsla(23, 85%, 63%, 1);
    --parchment: hsla(30, 15%, 70%, 1);
  }

  html, body {
    height: 100%;
  }

  body {
    background: var(--porcelain);

    @media (prefers-color-scheme: dark) {
      background: var(--squid-ink);
    }
  }
`

const Main = styled.main`
  max-width: 36em;
  margin: 0 auto;
  padding: 6em 2rem;
`

const NavLink = styled(Link)`
  color: var(--aubergine);
  display: block;
  font-family: "Vulf Mono", monospace;
  font-style: italic;
  font-weight: 400;
  margin-top: 1em;
  text-decoration: none;
  transition: letter-spacing 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    color: var(--sage);
  }

  ::after {
    content: "→";
    color: ${({ theme }) => theme.colors.background};
    display: inline-block;
    margin-left: 0.5em;
    transition: color 0.2s ease-in-out, transform 0.25s ease-in-out;
  }

  &:hover {
    letter-spacing: 0.05em;
    ::after {
      color: var(--aubergine);
      transform: translateX(4px);

      @media (prefers-color-scheme: dark) {
        color: var(--sage);
      }
    }
  }
`

const { Lead } = GlobalElements
const shortcodes = { Lead, NavLink }

const Layout = ({ children }) => {
  const [prefersDarkTheme, setPrefersDarkTheme] = useState(
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      false
  )

  typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").addListener(event => {
      if (event.matches) {
        setPrefersDarkTheme(true)
      } else {
        setPrefersDarkTheme(false)
      }
    })

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={prefersDarkTheme ? dark : light}>
      <Global />
      <MDXProvider components={{ ...shortcodes }}>
        <Main>{children}</Main>
      </MDXProvider>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
