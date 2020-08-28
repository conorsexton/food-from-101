import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { MDXRenderer as Markdown } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import Header from "../components/header"
import { normalizeQuantity, normalizeUnit } from "../helpers"
import { Ingredient } from "../components/ingredient"
import { H1, H2, Paragraph, InfoHeader, NavLink } from "../components/shared"
import { ATTRIBUTION_LEVELS } from "../helpers/constants"

const Yield = ({ yields }) => {
  return (
    <>
      <InfoHeader>Makes</InfoHeader>
      <Paragraph>{yields}</Paragraph>
    </>
  )
}

const Time = ({ time }) => {
  return (
    <>
      <InfoHeader>Takes</InfoHeader>
      <Paragraph>{time}</Paragraph>
    </>
  )
}

const FooterBase = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.embedded};
  display: flex;
  flex-wrap: wrap;
  margin-top: 3.5em;
  padding-top: 0.25em;
`

const Links = styled.section`
  display: flex;
  flex-direction: column;
`

const Attribution = styled.p`
  color: ${({ theme }) => theme.colors.darkAccent};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875em;
  font-weight: bold;
  line-height: 1.125;
  margin-top: 0.5em;
  opacity: 0.5;
  text-transform: uppercase;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
  }
`

const normalizeAttributionLevel = level => {
  if (!level) return null
  return level.toUpperCase() === ATTRIBUTION_LEVELS.INSPIRED
    ? "inspired by"
    : "adapted from"
}

const RecipeFooter = ({ source, attributionLevel, nextRecipe }) => {
  const attributionText = normalizeAttributionLevel(attributionLevel)
  return (
    <FooterBase>
      {source && attributionLevel && (
        <Attribution>
          *Recipe {attributionText} {source}
        </Attribution>
      )}
      <Links>
        <NavLink to="/recipes" direction="left">
          All recipes
        </NavLink>
        {nextRecipe && (
          <NavLink to={nextRecipe.slug}>{nextRecipe.name}</NavLink>
        )}
      </Links>
    </FooterBase>
  )
}

const Hero = styled.div`
  background: url(${props => props.src}) center;
  background-size: cover;
  height: 24em;
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
    line-height: 1.25;
    margin: 0 0 1em 2em;
    text-indent: -2em;
    ::before {
      background-color: ${({ theme }) => theme.colors.embedded};
      border-radius: 50%;
      color: ${({ theme }) => theme.colors.darkAccent};
      content: counter(list);
      display: inline-block;
      line-height: 1.125rem;
      margin-right: 1em;
      height: 20px;
      width: 20px;
      font-variant-numeric: tabular-nums;
      font-size: 0.875em;
      font-weight: 600;
      text-indent: 5px;
    }
    @media only screen and (max-width: 480px) {
      & {
        font-size: 1.125em;
      }
    }
  }
`

const IngredientsList = styled.ol`
  color: ${({ theme }) => theme.colors.text};
  list-style: none;
  margin-left: 0;
`

const Recipe = ({ data, pageContext }) => {
  const nextRecipe = pageContext?.next
    ? { slug: pageContext.next.fields.slug, name: pageContext.next.data.Name }
    : null
  const ingredientItems = data.airtable.data.Ingredients.map(ingredient => {
    const { Quantity, Unit, Name, Note } = ingredient.data
    return (
      <Ingredient
        quantity={normalizeQuantity(Quantity)}
        unit={normalizeUnit(Unit, Quantity)}
        name={Name}
        note={Note}
        key={ingredient.recordId}
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
        <header>
          <H1>{data.airtable.data.Name}</H1>
          <section>
            <Yield yields={data.airtable.data.Yield} />
            <Time time={data.airtable.data.Time} />
          </section>
        </header>
        <Paragraph>
          <Markdown>{data.airtable.data.Description.childMdx.body}</Markdown>
        </Paragraph>
        <H2>Ingredients</H2>
        <IngredientsList>{ingredientItems}</IngredientsList>
        <H2>Preparation</H2>
        <Prep>
          <Markdown>{data.airtable.data.Preparation.childMdx.body}</Markdown>
        </Prep>
        <RecipeFooter
          source={data.airtable.data.Source}
          attributionLevel={data.airtable.data.Source_Level}
          nextRecipe={nextRecipe}
        />
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
          recordId
          data {
            Quantity
            Unit
            Name
            Note
          }
        }
        Source
        Source_Level
      }
    }
  }
`
