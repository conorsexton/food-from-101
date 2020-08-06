import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { RecipeLink } from "./shared"

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

  const List = styled.ul`
    list-style: none;
    margin-left: 0;
  `

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

  return <List>{recipeLinks}</List>
}
