import React from 'react'
import Link from 'gatsby-link'
import Img from "gatsby-image"
import styled from 'styled-components';

import * as palette from '../utils/styles';

const IndexPage = ({data}) => {

const posts = data.allContentfulBlog.edges;
const page = data.contentfulHome;

const Wrapper = styled.div`
`
const Grid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat( 1fr);
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const Hero = styled.div`
height: ${palette.HEIGHT };
margin-top: -1rem;
position: relative;
overflow: hidden;
display: flex;
align-items: left;
justify-content: top;
flex-direction: column;
`
const SubGrid = styled.ul`
  display: grid;
  margin: 0;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const SubGridLeft = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const SubGridRight = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const GridItem = styled.div`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
`
const GridItemSwap = styled.div`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }
  @media (max-width: 768px) {
      order: 2;
  }
`
const Blurb = styled.div`
height: 50vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
`
const Card = styled(Link)`
    height: ${palette.HEIGHT };
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: left;
    justify-content: top;
    flex-direction: column;
`
const Cover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 1s;
`
const Data = styled.div`
    padding: 1rem;
    text-align: center;
`
const Name = styled.h1`
    text-transform: uppercase;
    font-size: 2rem;
`
const Description = styled.p`
`

return (
  <wrapper>
    <Grid>
      <GridItem>
        <Hero>
          <Cover>
            <Img sizes={page.hero.sizes}/>
          </Cover>
        </Hero>
      </GridItem>
      <Blurb dangerouslySetInnerHTML={{ __html: page.bio.childMarkdownRemark.html }} />
      <SubGridLeft>
        <GridItem>
          <Card to={posts[0].node.slug + "/"} >
            <Cover>
              <Img sizes={posts[0].node.featuredImage.sizes}/>
            </Cover>
          </Card>
        </GridItem>
        <GridItem>
          <Data to={posts[0].node.slug + "/"} >
            <Name>{posts[0].node.title}</Name>
            <Description>{posts[0].node.blurb}</Description>
          </Data>
        </GridItem>
      </SubGridLeft>
      <SubGridRight>
        <GridItemSwap>
          <Data to={posts[1].node.slug + "/"} >
            <Name>{posts[1].node.title}</Name>
            <Description>{posts[1].node.blurb}</Description>
          </Data>
        </GridItemSwap>
        <GridItem>
          <Card to={posts[1].node.slug + "/"} >
            <Cover>
              <Img sizes={posts[1].node.featuredImage.sizes}/>
            </Cover>
          </Card>
        </GridItem>
      </SubGridRight>
        <Blurb dangerouslySetInnerHTML={{ __html: page.snippet.childMarkdownRemark.html }} />
      <SubGrid>
        {posts.slice(2).map(({ node: post }) => (
          <GridItem key={post.id}>
            <Card to={post.slug + "/"} >
              <Cover>
                <Img sizes={post.featuredImage.sizes}/>
              </Cover>
            </Card>
          </GridItem>
          ))}
      </SubGrid>
    </Grid>
  </wrapper>
    )
}

export const query = graphql`
  query HomeQuery {
    allContentfulBlog {
      edges {
        node {
          title
          id
          slug
          blurb
          createdAt(formatString: "MMMM DD, YYYY")
          featuredImage {
            title
            sizes(maxWidth: 1000) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
        }
      }
    }
    contentfulHome {
      title
      id
      hero {
        title
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_noBase64
        }
      }
      bio {
        childMarkdownRemark {
          html
        }
      }
    }
      snippet {
        childMarkdownRemark {
          html
        }
     }
  }
`
export default IndexPage;
