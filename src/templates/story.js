import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const StoryTemplate = ({
  html,
  helmet,
  isPreview = false
}) => {
  return (
    <section className="post">
      {helmet || ''}
      <div className="container">
        <h2 className="page-title">Institutional Bullying is...</h2>
        {isPreview ? <div className="preview-padding"></div> : ''}
          <span className="subtitle flex-item" dangerouslySetInnerHTML={{__html: html}}></span>
      </div>
    </section>
  )
}

StoryTemplate.propTypes = {
  html: PropTypes.string,
  helmet: PropTypes.object,
}

const Story = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <StoryTemplate
        html={post.html}
        helmet={
          <Helmet titleTemplate="%s">
            <title>{`${truncate(htmlToString(post.html), 10)}`}</title>
            <meta
              name="description"
              content={`${truncate(htmlToString(post.html), 50)}`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

function htmlToString(inputHtml) {
  var div = document.createElement("div");
  div.innerHTML = inputHtml;
  return div.textContent || div.innerText || "";
}

function truncate(input, lengthOfOutput) {
  if (input.length > lengthOfOutput)
    return input.substring(0,lengthOfOutput) + '...';
  else
    return input;
};

Story.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Story

export const pageQuery = graphql`
  query StoryByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
