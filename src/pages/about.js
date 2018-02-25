import React from 'react'
import Img from "gatsby-image"
import styled from 'styled-components';

import * as palette from '../utils/styles';

const Wrapper = styled.div`

`;

const Grid = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat( 2, minmax(25vw, 1fr) );
  grid-auto-flow: row dense;
  grid-gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  .gatsby-image-outer-wrapper, .gatsby-image-wrapper {
    position: static !important;
  }

`;

const Card = styled.div`
    height: ${palette.HEIGHT };;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: left;
    justify-content: top;
    flex-direction: column;

`;

const Cover = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Data = styled.div`
    padding: 1rem;
    z-index: 10;
    opacity: 1;
`;

const CardContent = styled.div`
    padding: 1rem;
    position: relative;
`;

const Name = styled.h1`
    text-transform: uppercase;
    font-size: 2rem;
`;




const AboutPage = ({data}) => {
  const {name,bio,portrait} = data.contentfulAbout;
        return (
      <wrapper>
        <Grid>
        <GridItem>
          <Card>
              <Cover>
                <Img resolutions={portrait.resolutions}/>
              </Cover>
            </Card>
        </GridItem>
        <GridItem>
          <Card>
              <Data>
                <CardContent>
                  <Name>{name}</Name>
                  <div dangerouslySetInnerHTML={{ __html: bio.childMarkdownRemark.html }} />
                </CardContent>
              </Data>
            </Card>
        </GridItem>
        </Grid>
      </wrapper>
    )
}


export default AboutPage

export const query = graphql`
  query AboutQuery {
    contentfulAbout {
      name
      id
      portrait {
        resolutions(width: 740) {
            ...GatsbyContentfulResolutions_withWebp
        }
      }
      bio {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
