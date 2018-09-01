import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ProjectLink = styled(Link)`
  text-decoration: none;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    flex-grow: 1;
    width: 50%;
    transition: all 0.5s;
    h1 {
      color: ${props => props.theme.colors.secondary};
    }
    &:hover div {
      @supports (object-fit: cover) {
        opacity: 1;
        visibility: visible;
      }
    }
    &:hover h1 {
      color: ${props => props.theme.colors.highlight};
    }
  }
`
const Cover = styled.div`
  top: 3.5rem;
  position: relative;
  div {
    height: 100% !important;
    width: 100%;
    object-fit: cover !important;
    display: block;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    position: fixed !important;
    pointer-events: none;
    transition: opacity 0.3s, visibility 0.3s;
    width: calc(50% - 4rem);
    height: calc(100vh - 5.5rem);
    top: 3.5rem;
    left: 2rem;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    div {
      height: 100% !important;
      object-fit: cover !important;
    }
  }
`
const Title = styled.h1`
  padding: 0 0 2rem;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 2rem;
    z-index: 3;
    text-transform: uppercase;
    text-align: center;
  }
`
const Date = styled.p`
  text-align: center;
  text-transform: uppercase;
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    text-transform: capitalize;
    padding: 0 1rem 1rem;
  }
`

const BlogList = props => {
  return (
    <ProjectLink key={props.id} to={`/blog/${props.slug}/`}>
      <Cover>
        <Img fluid={props.image.fluid} backgroundColor={'#eeeeee'} />
      </Cover>
      <Title>{props.title}</Title>
      <Date>{props.date}</Date>
    </ProjectLink>
  )
}

export default BlogList
