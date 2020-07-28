import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { MDXRenderer as Markdown } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import { normalizeQuantity, normalizeUnit } from "../helpers"
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

const Hero = styled.div`
  background: url(${props => props.src}) center;
  background-size: cover;
  height: 24em;
`

const Header = styled.header`
  position: fixed;
  height: 70px;
  width: 100%;
`

const Prep = styled.section`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};

  ol {
    counter-reset: list;
    list-style: none;
    margin-left: 0;
  }

  li {
    counter-increment: list;
    margin-left: 2em;
    text-indent: -2em;
    ::before {
      background-color: ${({ theme }) => theme.colors.embedded};
      border-radius: 50%;
      color: ${({ theme }) => theme.colors.darkAccent};
      content: counter(list);
      display: inline-block;
      line-height: 1.25em;
      margin-right: 1em;
      height: 20px;
      width: 20px;
      font-variant-numeric: tabular-nums;
      font-size: 0.875em;
      font-weight: 600;
      text-indent: 5px;
    }
  }
`

const IngredientsList = styled.ol`
  color: ${({ theme }) => theme.colors.text};
  list-style: none;
  margin-left: 0;
`

const Recipe = ({ data }) => {
  const ingredientItems = data.airtable.data.Ingredients.map(ingredient => {
    const { Quantity, Unit, Name, Note } = ingredient.data
    return (
      <Ingredient
        quantity={normalizeQuantity(Quantity)}
        unit={normalizeUnit(Unit, Quantity)}
        name={Name}
        note={Note}
      />
    )
  })
  return (
    <>
      <Header />
      {data?.airtable?.data?.Photo && (
        <Hero src={data.airtable.data.Photo[0].url} />
      )}
      <Layout>
        <H1>{data.airtable.data.Name}</H1>
        <Yield yields={data.airtable.data.Yield} />
        <Time time={data.airtable.data.Time} />
        <Paragraph>
          <Markdown>{data.airtable.data.Description.childMdx.body}</Markdown>
        </Paragraph>
        <H2>Ingredients</H2>
        <IngredientsList>{ingredientItems}</IngredientsList>
        <H2>Preparation</H2>
        <Prep>
          <Markdown>{data.airtable.data.Preparation.childMdx.body}</Markdown>
        </Prep>
      </Layout>
    </>
  )
}

export default Recipe

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
          url
        }
        Yield
        Time
        Preparation {
          childMdx {
            body
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
