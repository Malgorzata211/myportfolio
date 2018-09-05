import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  grid-area: InfoBodyBottom;
  margin: 0;
  padding: 0 0 2rem;
  height: 100%;
  grid-template-rows: repeat(auto);
`

const InfoBodyBottom = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default InfoBodyBottom
