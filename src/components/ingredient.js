import React from "react"
import styled from "styled-components"

const Item = styled.li`
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 0.5em;
`
const Link = styled.a`
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const capitalizeFirstLetter = string =>
  string[0].toUpperCase() + string.slice(1)

export const Ingredient = ({ quantity, unit, name, note, link }) => {
  let amount = `${quantity || ""} ${unit}`
  let ingredient = quantity ? name : capitalizeFirstLetter(name)
  let notes = (note && `, ${note}`) || ""
  return (
    <Item>
      {amount + " "}
      {link ? <Link href={link}>{ingredient}</Link> : ingredient}
      {notes}
    </Item>
  )
}
