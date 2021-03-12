import NextLink from 'next/link'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import CardGallery from '../components/CardGallery'

export default function Home({ galleries }) {
  return (
    <div className="py-24 mx-auto grid gap-20 md:gap-30">
      <div className="pb-8">
        <h1 className="pb-8 font-serif text-5xl font-bold text-center text-transparent md:text-6xl from-titleg1 to-titleg2 bg-gradient-to-r bg-clip-text">
          There's a lot of beauty in
          <br />
          ordinary things
        </h1>
        <div className="py-8 mx-auto text-center prose prose-2xl text-gray-50">
          <p>
            I'm a self-taught photographer documenting spaces and people.
            <br />
            Learn more <NextLink href="/biography">about me</NextLink> or{' '}
            <a href="https://contact.jpvalery.me">get in touch</a>.
          </p>
        </div>
      </div>
      <div className="items-center grid grid-cols-1 justify-items-center gap-12 md:gap-48">
        {galleries.map((gallery) => {
          return (
            <CardGallery
              key={gallery.id}
              slug={gallery.slug}
              image={gallery.heroImage}
              title={gallery.title}
              year={gallery.year}
              tags={gallery.tagsCollection.items}
              date={gallery.publishDate}
            />
          )
        })}
      </div>
    </div>
  )
}

// We use getStaticProps to get the content at build time
export async function getStaticProps() {
  // We use Apollo to query Contentful GraphQL API
  const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    cache: new InMemoryCache(),
    credentials: 'same-origin',
  })

  // We define our query here
  const { data } = await client.query({
    query: gql`
      query Index {
        extendedGalleryCollection(
          order: publishDate_DESC
          where: { displayHome: true }
        ) {
          items {
            title
            slug
            year
            body
            metaDescription
            summary
            tagsCollection {
              items {
                title
                slug
              }
            }
            publishDate
            heroImage {
              title
              description
              contentType
              fileName
              size
              url
              width
              height
            }
          }
        }
      }
    `,
  })

  // We return the result of the query as props to pass them above
  return {
    props: {
      galleries: data.extendedGalleryCollection.items,
    },
  }
}
