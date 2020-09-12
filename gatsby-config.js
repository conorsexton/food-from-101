require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Food From 101`,
    description: `A slapdash collection of remixed recipes, cooking techniques, and a few baking miracles.`,
    keywords: ["cooking", "food", "recipes"],
    author: `Conor Sexton & Nolan Henningson`,
    siteUrl: `https://foodfrom101.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: `appA6V5qPTsqoMovg`,
            tableName: `Recipes`,
            queryName: `Recipes`,
            tableLinks: [`Ingredients`],
            mapping: {
              Preparation: "text/markdown",
              Description: "text/markdown",
              Image: `fileNode`,
            },
          },
          {
            baseId: `appA6V5qPTsqoMovg`,
            tableName: `Ingredients`,
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/templates/default.js"),
        },
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `food-from-101`,
        short_name: `food-from-101`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-favicon`,
  ],
}
