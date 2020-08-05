import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { RecipeLink } from "./layout"
// import styled from "styled-components"

export const RecipeList = () => {
  const data = useStaticQuery(graphql`
    query {
      allAirtable(
        sort: { fields: data___ID, order: DESC }
        filter: { table: { eq: "Recipes" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            data {
              Name
            }
            recordId
          }
        }
      }
    }
  `)

  const recipeLinks = data.allAirtable.edges.map((recipe, i) => {
    const {
      data: { Name },
      fields: { slug },
    } = recipe.node
    return (
      <li key={data.allAirtable.edges[i].node.recordId}>
        <RecipeLink to={slug}>{Name}</RecipeLink>
      </li>
    )
  })

  return <ul>{recipeLinks}</ul>
}
