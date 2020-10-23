import { useState, useEffect } from 'react';

const gql = String.raw;

const deets = `
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip #low quality placeholder
      }
    }
  }
`;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [sliceMasters, setSliceMasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('shoooot....');
        console.log(err);
      });
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}
