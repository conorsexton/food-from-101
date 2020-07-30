import React from "react"
import styled from "styled-components"

const Item = styled.li`
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 0.5em;
`

const capitalizeFirstLetter = string =>
  string[0].toUpperCase() + string.slice(1)

export const Ingredient = ({ quantity, unit, name, note }) => {
  return (
    <Item>{`${quantity || ""} ${unit} ${
      quantity ? name : capitalizeFirstLetter(name)
    }${(note && `, ${note}`) || ""}`}</Item>
  )
}
