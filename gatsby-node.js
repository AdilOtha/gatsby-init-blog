const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  createPage({
    path: '/using-dsg',
    component: require.resolve('./src/templates/using-dsg.js'),
    context: {},
    defer: true
  })

  const postTemplate = path.resolve('src/templates/blog-post.js')

  return graphql(`
  query loadPagesQuery {
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter{
              path
              title
              date
              author
          }
          excerpt
        }
    }
  } 
} 
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })
    })
  })
}
