/* eslint-disable react/prop-types */
import { graphql, Link } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
        <div>
            <Link to={'/blog'}>Go Back</Link>
            <hr />
            <h1>{post.frontmatter.title}</h1>
            <h4>Posted by {post.frontmatter.author} on {post.frontmatter.date}</h4>
            <div dangerouslySetInnerHTML={ { __html: post.html } } />
        </div>
    </Layout>
  )
}

export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }){
            html
            frontmatter {
                path
                title
                author
                date
            }
        }
    }
`

export default BlogPost
