import React from "react"
import styled from "styled-components"

const Item = styled.li`
  font-family: ${({ theme }) => theme.fonts.body};
`

export const Ingredient = ({ quantity, unit, name, note }) => {
  return <Item>{`${quantity} ${unit} ${name} ${note}`}</Item>
}
