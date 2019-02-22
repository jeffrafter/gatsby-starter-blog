import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Head from "../components/head";

class BlogCategories extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const group = data.allMarkdownRemark.group;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Head
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <ul>
          {group.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/category/${category.fieldValue}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default BlogCategories;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { published: { ne: false } } }
      sort: { fields: [frontmatter___category], order: ASC }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
