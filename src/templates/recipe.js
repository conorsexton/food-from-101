import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { MDXRenderer as Markdown } from "gatsby-plugin-mdx"
import { normalizeQuantity } from "../helpers"
import Layout from "../components/layout"
import { Ingredient } from "../components/ingredient"
import { H1, H2, Paragraph, InfoHeader } from "../components/shared"

const Yield = ({ yields }) => {
  return (
    <>
      <InfoHeader>Serves</InfoHeader>
      <Paragraph>{yields}</Paragraph>
    </>
  )
}

const Time = ({ time }) => {
  return (
    <>
      <InfoHeader>Time</InfoHeader>
      <Paragraph>{time}</Paragraph>
    </>
  )
}

const IngredientsList = styled.ol`
  list-style: none;
  margin-left: 0;
`

const Recipe = ({ data }) => {
  const ingredientItems = data.airtable.data.Ingredients.map(ingredient => {
    const { Quantity, Unit, Name, Note } = ingredient.data
    return (
      <Ingredient
        quantity={normalizeQuantity(Quantity)}
        unit={Unit}
        name={Name}
        note={Note}
      />
    )
  })
  return (
    <Layout>
      <H1>{data.airtable.data.Name}</H1>
      <Yield yields={data.airtable.data.Yield} />
      <Time time={data.airtable.data.Time} />
      <Paragraph>
        <Markdown>{data.airtable.data.Description.childMdx.body}</Markdown>
      </Paragraph>
      <H2>Ingredients</H2>
      <IngredientsList>{ingredientItems}</IngredientsList>
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
