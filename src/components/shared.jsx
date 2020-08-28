import { Link } from "gatsby"
import styled from "styled-components"

export const Lead = styled.header`
  color: ${({ theme }) => theme.colors.accent};
  line-height: 2.75rem;
  font-size: 2.25em;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 400;
  margin-bottom: 2em;

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
  margin-bottom: 2em;
`

export const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.skinny};
  font-size: 1.25em;
`

export const WideHeader = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.125em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export const InfoHeader = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  display: inline;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
`

export const Paragraph = styled.section`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.25;
  margin-bottom: 1em;
  font-family: ${({ theme }) => theme.fonts.body};
`
export const NavLink = styled(Link)`
  color: var(--aubergine);
  display: block;
  font-family: "Vulf Mono", monospace;
  font-style: italic;
  font-weight: 400;
  margin-top: 1em;
  ${props => props.direction === "left" && `margin-left: -1em;`}
  text-decoration: none;
  transition: letter-spacing 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    color: var(--sage);
  }

  ${props =>
    props.direction === "left"
      ? `::before {
          content: "←";
          color: ${props.theme.colors.background};
          display: inline-block;
          margin-right: 0.5em;
          transition: color 0.2s ease-in-out, transform 0.25s ease-in-out;
        }`
      : `::after {
          content: "→";
          color: ${props.theme.colors.background};
          display: inline-block;
          margin-left: 0.5em;
          transition: color 0.2s ease-in-out, transform 0.25s ease-in-out;
        }`}

  &:hover {
    letter-spacing: 0.05em;
    ::after {
      color: var(--aubergine);
      transform: translateX(4px);
    }
    ::before {
      color: var(--aubergine);
      transform: translateX(-4px);
    }
      @media (prefers-color-scheme: dark) {
        color: var(--sage);
      }
    }
  }
`

export const RecipeLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.accent};
  transition: text-decoration-color 0.2s ease-in-out, color 0.2s ease-in-out;
  text-decoration: ${({ theme }) => theme.colors.background} underline;
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration-color: ${({ theme }) => theme.colors.text};
    letter-spacing: initial;

    @media (prefers-color-scheme: dark) {
      color: ${({ theme }) => theme.colors.embedded};
      text-decoration-color: ${({ theme }) => theme.colors.embedded};

      &::after {
        color: ${({ theme }) => theme.colors.embedded};
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.text};
  }
`
