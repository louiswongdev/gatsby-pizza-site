import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // what is the URL for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get template for this page
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that topping
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. Fetch list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // 2. Loop over each one
  for (const beer of beers) {
    // create a node for each beer
    // const nodeContent = JSON.stringify(beer);
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. Turn each slicemaster into own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many pages there are based
  // on how many slicemasters there are, and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 4. Looop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // create pages dynamically
  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 1. Pizzas
}
