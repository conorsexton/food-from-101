import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"

const DefaultTemplate = ({
  children,
  pageContext: {
    frontmatter: { title },
  },
}) => {
  debugger
  return (
    <>
      <SEO title={title} />
      <Header />
      <Layout>{children}</Layout>
    </>
  )
}

export default DefaultTemplate
