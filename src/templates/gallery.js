import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperGallery from '../components/WrapperGallery'
import GalleryHead from '../components/GalleryHead'
import TagList from '../components/TagList'
import SEO from '../components/SEO'
import sizeMe from 'react-sizeme'
import StackGrid from 'react-stack-grid'

const GalleryTemplate = ({ data }) => {
  const { title, slug, tags, images } = data.contentfulGallery
  const galleryNode = data.contentfulGallery
  const { width } = images
  console.log(images)

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} galleryNode={galleryNode} gallerySEO />
      <GalleryHead title={title} tags={tags} />
      <WrapperGallery>
        <StackGrid
          columnWidth={width <= 768 ? '100%' : '33.333%'}
          gutterWidth={32}
          gutterHeight={32}
          duration={0}
        >
          {images &&
            images.map((images, index) => (
              <Img
                key={index}
                sizes={images.fluid}
                alt={images.title}
                title={images.title}
              />
            ))}
        </StackGrid>
      </WrapperGallery>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulGallery(slug: { eq: $slug }) {
      title
      id
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      heroImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }

      images {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
    allContentfulGallery(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`
export default sizeMe()(GalleryTemplate)
