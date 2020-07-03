import React from "react"
import { MDXProvider } from "@mdx-js/react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
import { light } from "../global-themes"
import * as GlobalElements from "../components/shared"

const Global = createGlobalStyle`
  :root {
    /* Light Theme Colors */
    --porcelain: hsla(185, 100%, 95%, 1);
    --ripe-tomato: hsla(5, 100%, 60%, 1);
    --aubergine: hsla(233, 57%, 18%, 1);
  }

  html, body {
    height: 100%;
  }

  body {
    background: var(--porcelain);
  }
`

const Main = styled.main`
  max-width: 36em;
  margin: 6em auto;
  padding: 0 2rem;
`

const { Lead } = GlobalElements
const shortcodes = { Lead }

const Layout = ({ children }) => {
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
    <ThemeProvider theme={light}>
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
