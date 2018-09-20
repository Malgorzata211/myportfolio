import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Prism from 'prismjs'
require('../../styles/prism.css')

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 2rem 2rem;
`

const Body = styled.div`
  margin: 0 auto;
  padding: 1rem 0 2rem;
  h1,
  h2,
  h3 {
    font-weight: 800;
    line-height: 1.25;
    text-transform: capitalize;
    margin: 0.5rem 0 1rem 0;
  }

  p {
    line-height: 1.6;
    margin: 1rem 0;
  }

   a {
    transition: 0.2s;
    color: ${props => props.theme.colors.tertiary};
font-weight: 700;
font-style: italic;
text-decoration: none;
  text-shadow: 1px 1px 0 ${props => props.theme.colors.base}, -1px 1px 0 ${props => props.theme.colors.base}, 2px 0 0 ${props => props.theme.colors.base}, -2px 0 0 ${props => props.theme.colors.base};
  box-shadow: inset 0 -1px 0 0 ${props => props.theme.colors.base}, inset 0 -3px 0 0 ${props => props.theme.colors.tertiary};
    &:hover {
      color: ${props => props.theme.colors.highlight};
box-shadow: inset 0 -1px 0 0 ${props => props.theme.colors.base}, inset 0 -3px 0 0 ${props => props.theme.colors.highlight};
    }
  }


  del {
    text-decoration: line-through;
  }
  strong {
    font-weight: 800;
  }
  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 0 0 2em 0;
  }

  ul {
    li {
      list-style: disc;
      list-style-position: inside;
      line-height: 1.25;
      &:last-child {
        margin: 0;
      }
    }
  }

  ol {
    li {
      list-style: decimal;
      list-style-position: inside;
      line-height: 1.25;
      &:last-child {
        margin: 0;
      }
    }
  }

  hr {
    border-style: solid;
    border-color: ${props => props.theme.colors.secondary};
    margin: 0 0 2em 0;
  }

  blockquote {
    font-style: italic;
    border-left: 4px solid ${props => props.theme.colors.highlight};
    padding: 0 0 0 0.5em;
    width: calc(100vw - 4rem);
    @media (min-width: ${props => props.theme.responsive.medium}) {
      width: 100%;
    }
  }
  pre, code {
    width: calc(100vw - 4rem);
    @media (min-width: ${props => props.theme.responsive.medium}) {
      width: 100%;
    }
  }
    img {
      box-shadow: 10px 5px 5px red;
      padding: 0.5rem;
    }
    @media (min-width: ${props => props.theme.responsive.medium}) {
      overflow-x: auto;
      width: auto;
      max-width: 45vw;
    }
  }
`
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  a {
    background: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.base};
    padding: 1em;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
    &:hover {
      background: ${props => props.theme.colors.highlight};
    }
  }
`
const PreviousLink = styled(Link)`
  margin-right: 1rem;
  order: 1;
`

const NextLink = styled(Link)`
  margin-left: 1rem;
  order: 2;
`

const Article = props => {
  return (
    <Wrapper>
      <Body
        dangerouslySetInnerHTML={{
          __html: props.body.childMarkdownRemark.html,
        }}
      />
      <LinkWrapper>
        {props.previous && (
          <PreviousLink to={`/blog/${props.previous.slug}/`}>
            Prev Post
          </PreviousLink>
        )}
        {props.next && (
          <NextLink to={`/blog/${props.next.slug}/`}>Next Post</NextLink>
        )}
      </LinkWrapper>
    </Wrapper>
  )
}

export default Article
