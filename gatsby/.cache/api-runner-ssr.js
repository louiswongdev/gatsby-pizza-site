var plugins = [{
      plugin: require('/Users/louis/Desktop/master-gatsby/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/louis/Desktop/master-gatsby/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/louis/Desktop/master-gatsby/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"3oag8wpu","dataset":"production","watchMode":true,"token":"sku382xtesBvyJg23CcWpjyjoY1xtwGvGCDn5PfZTStmFYPsdPcyHVjk7ftW66N1ejM9O5mHSmPg0AZ5t5bS3hNcmX80PNDf1kdqTApwIgY9xAgrvEc2yysuRvd7xT7S3ctE4DUKcbd26cHeAXDcjueVwpa86GWRaZjjtiYWIDyfInlxmznW"},
    },{
      plugin: require('/Users/louis/Desktop/master-gatsby/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
