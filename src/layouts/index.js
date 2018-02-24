import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';

import * as palette from '../utils/styles';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

/* eslint no-unused-expressions: off */
injectGlobal`
  :root {
    font-size: 16px;
    padding: .5rem;
    background: ${palette.HTML_COLOR };
    background-image:
  linear-gradient(
    to bottom right,
    ${palette.HTML_COLOR },
    ${palette.SECONDARY_COLOR } 100%);
    @supports(padding: max(0px)) {
    .post {
        padding-left: max(12px, env(safe-area-inset-left));
        padding-right: max(12px, env(safe-area-inset-right));
    }
}
  }
  body {
    background: ${palette.BG_COLOR };
    padding: 1rem;
    color: ${palette.COLOR };
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    color: ${palette.COLOR };
    text-decoration: none;
  }
  a:hover {
    color: ${palette.COLOR };
    text-decoration: none;
  }
  .gatsby-resp-image-wrapper {
    margin: 2.75rem 0;
  }
`;

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>I AM MATTHIAS</title>
      <meta name='viewport' content='initial-scale=1, viewport-fit=cover' />
      </Helmet>
      <Nav />
      {children()}
      <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
