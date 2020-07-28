import React from "react"
import styled from "styled-components"

const Item = styled.li`
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 0.5em;
`

export const Ingredient = ({ quantity, unit, name, note }) => {
  return (
    <Item>{`${quantity || ""} ${unit} ${name}${
      (note && `, ${note}`) || ""
    }`}</Item>
  )
}
