import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Head from "../components/head";

class BlogTags extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const group = data.allMarkdownRemark.group;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Head
          title="All tags"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <ul>
          {group.map(
            tag =>
              tag && (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${tag.fieldValue}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              )
          )}
        </ul>
      </Layout>
    );
  }
}

export default BlogTags;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { published: { ne: false } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
