/* eslint-disable no-param-reassign */
import { Box, Container, Text, Stack } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import parameterize from "parameterize";
import moment from "moment";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import readingTime from "reading-time";
import Layout from "../../components/layouts/Article";
import markdownToHtml from "../../libs/MDParser";
import Title from "../../components/Title";
import { getCMSBaseUrl } from "../../libs/functions";
import {
  renderHyperlinks,
  renderListItem,
  renderQuotes,
  renderUnorderedList,
} from "../../components/ArticleCustomElements";

const TableOfContents = ({ TOC }) => (
  <Box
    borderRadius="lg"
    borderWidth={1}
    height="fit-content"
    width="100%"
    p={5}
    flex={1}
    position={{ base: "relative", md: "sticky" }}
    top={{ base: 0, md: 16 }}
    my={{ base: 8, md: 0 }}
  >
    <h3 style={{ marginBottom: 6 }}>Contents</h3>
    <ul>
      {TOC.map(({ id, title }) => (
        <div className="toc-list-item" key={id}>
          <a href={`#${id}`}>{title}</a>
        </div>
      ))}
    </ul>
  </Box>
);

const Work = ({ post, TOC, md }) => (
  <Layout title={post.title} desc={post.description} img={post.thumbnail}>
    <Container maxW="container.lg" mt={4}>
      <Stack
        direction={{ base: "column", md: "row" }}
        flexDir="row"
        spacing={10}
        maxW="container.lg"
      >
        {/** TODO: I am sure there is a better way to do this */}
        {/* <Box height={0} flex={{ base: 0, md: 1 }} bgColor='red' /> */}
        <Box flex={4} align="center" mt={12} mb={6}>
          <Title
            letterSpacing={-1}
            fontWeight="bold"
            fontFamily="Abril Fatface"
            lineHeight={1.05}
            style={{ marginBottom: 10, flex: 3, justifyItems: "baseline" }}
          >
            {post.title}
          </Title>
          <Text my={2} opacity={0.7} fontStyle="italic">
            {post.description}
          </Text>
          <Text my={4} opacity={0.6} fontSize={13}>
            {post.uploaded === null ? "UPLOAD_DATE" : post.uploaded} •{" "}
            {`${readingTime(md).words} words`} •{" "}
            {`${readingTime(md).text.split(" ")[0]} min read`}
          </Text>
        </Box>
      </Stack>
      {TOC.length === 0 ? (
        <Box width="100%" textAlign="start" align="center">
          <Box
            maxWidth="container.sm"
            fontSize={14}
            height="auto"
            m="0 auto"
            pos="relative"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="article"
              components={{
                li: renderListItem,
                ul: renderUnorderedList,
                blockquote: renderQuotes,
                a: renderHyperlinks,
              }}
            >
              {md}
            </ReactMarkdown>
          </Box>
        </Box>
      ) : (
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 0, md: 12 }}
          mt={{ base: 0, md: 42 }}
        >
          <TableOfContents TOC={TOC} />
          <Box maxW="container.md" fontSize={14}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="article"
              components={{
                li: renderListItem,
                ul: renderUnorderedList,
                blockquote: renderQuotes,
                a: renderHyperlinks,
              }}
            >
              {md}
            </ReactMarkdown>
          </Box>
        </Stack>
      )}

      <Text align="center" py="2.5em" opacity={0.25}>
        □ ○ △
      </Text>
      {/** <------ Extract to ShareButton Component ------> */}
      {/* <Tooltip hasArrow label="Copy post link to clipboard">
          <Button
            onClick={() => {
              navigator.clipboard.writeText(location.href);
              setCopied(true);
            }}
          >
            {copied ? "Link Copied" : "Share"}
          </Button>
        </Tooltip> */}
    </Container>
  </Layout>
);

export default Work;

export const ProductImageStyle = () => (
  <Global
    styles={`
      .pimage {
        border-radius: 8px;
      }
    `}
  />
);

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `${getCMSBaseUrl()}/posts?filters[slug]=${params.slug}`
  );
  const TOC = [];
  const result = await res.json();
  const rawHtmlContent = await markdownToHtml(result.data[0].attributes.body);
  const mdContent = result.data[0].attributes.body;
  const htmlContent = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(() => (tree) => {
      visit(tree, "element", (node) => {
        if (node.tagName === "h2") {
          const id = parameterize(node.children[0].value);
          node.properties.id = id;
          TOC.push({ id, title: node.children[0].value });
        }
      });
    })
    .use(rehypeStringify)
    .processSync(rawHtmlContent)
    .toString();
  result.data[0].attributes.uploaded = moment(
    result.data[0].attributes.uploaded
  ).format("DD MMM YYYY");
  return {
    props: {
      post: result.data[0].attributes,
      html: htmlContent,
      md: mdContent,
      TOC,
    },
    revalidate: 7200,
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${getCMSBaseUrl()}/posts`);
  const response = await res.json();
  const paths = response.data.map((post) => ({
    params: { slug: post.attributes.slug },
  }));

  return { paths, fallback: false };
};
