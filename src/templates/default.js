import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"

const DefaultTemplate = ({ children, data }) => {
  return (
    <>
      <Header />
      <Layout>{children}</Layout>
    </>
  )
}

export default DefaultTemplate
