import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SlicemasterStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  & > div {
    /* text-align: center; */
    padding: 0 2rem;
  }
`;

export default function SlicemasterPage({ data: { slicemaster } }) {
  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster.image.asset.fluid.src} />
      <SlicemasterStyles>
        <Img fluid={slicemaster.image.asset.fluid} />
        <div>
          <h2 className="mark">{slicemaster.name}</h2>
          <p>{slicemaster.description}</p>
        </div>
      </SlicemasterStyles>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
