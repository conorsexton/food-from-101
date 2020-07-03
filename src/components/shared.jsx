import React from "react"
import styled from "styled-components"

export const Lead = styled.header`
  color: ${({ theme }) => theme.colors.accent};
  line-height: 2.75rem;
  font-size: 2.25em;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 400;

  strong {
    font-family: ${({ theme }) => theme.fonts.jumbo};
  }
`
export const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.125;
  font-size: 1.75em;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 400;
`
export const InfoHeader = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
`

export const Paragraph = styled.p`
  line-height: 1.25;
  font-family: ${({ theme }) => theme.fonts.body};
`
