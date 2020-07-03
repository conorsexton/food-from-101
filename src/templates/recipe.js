import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { MDXRenderer as Markdown } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import { Ingredient } from "../components/ingredient"
import { H1, Paragraph } from "../components/shared"

const Description = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.accent};
`

const Yield = ({ yield }) => {}

const Recipe = ({ data }) => {
  const ingredientItems = data.airtable.data.Ingredients.map(ingredient => {
    const { Quantity, Unit, Name, Note } = ingredient.data
    const normalizedQuantity = Quantity === 0.5 ? "½" : Quantity
    return (
      <Ingredient
        quantity={normalizedQuantity}
        unit={Unit}
        name={Name}
        note={Note}
      />
    )
  })
  return (
    <Layout>
      <H1>{data.airtable.data.Name}</H1>
      <Description>
        <Markdown>{data.airtable.data.Description.childMdx.body}</Markdown>
      </Description>
      <div>Yield: {data.airtable.data.Yield} slices</div>
      <div>Time: {data.airtable.data.Time}</div>
      <h2>Ingredients</h2>
      <ol>{ingredientItems}</ol>
    </Layout>
  )
}

export default Recipe

// @TODO: Replace with dynamic query
export const recipeQuery = graphql`
  query RecipeData($name: String!) {
    airtable(data: { Name: { eq: $name } }) {
      data {
        Name
        Description {
          childMdx {
            body
            rawBody
          }
        }
        Photo {
          thumbnails {
            full {
              url
            }
          }
        }
        Yield
        Time
        Preparation {
          childMarkdownRemark {
            html
          }
        }
        Ingredients {
          data {
            Quantity
            Unit
            Name
            Note
          }
        }
      }
    }
  }
`
