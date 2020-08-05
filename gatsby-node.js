const path = require(`path`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug

  if (node.internal.type === `Airtable` && node.table === `Recipes`) {
    slug = `/${node.data.Name.replace(/ /g, "-")
      .replace(/[,&]/g, "")
      .toLowerCase()}/`
    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pages = []
    const atRecipes = path.resolve("src/templates/recipe.js")

    graphql(`
      {
        allAirtable(filter: { table: { eq: "Recipes" } }) {
          edges {
            node {
              id
              data {
                Name
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        result.errors.forEach(error => {
          console.log(error)
        })

        reject(result)
      }
      result.data.allAirtable.edges.forEach(edge => {
        createPage({
          path: edge.node.fields.slug,
          component: atRecipes,
          context: {
            name: edge.node.data.Name,
          },
        })
      })

      resolve()
    })
  })
}
