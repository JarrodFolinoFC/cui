import React, { useState, useEffect } from "react";
import { List, Tag, Typography, Space, Flex } from "antd";
import Markdown from "react-markdown";
import PreviewCard from "../PreviewCard";

function tagLi(item) {
  return item.match(/tag\((.*)\)/);
}

const titleConfig = {
  h1({ children }) {
    return <Typography.Paragraph>{children}</Typography.Paragraph>;
  },
  h2({ _ }) {
    return null;
  },
  h3() {
    return null;
  },
  ul({ _ }) {
    return null;
  },
  li({ _ }) {
    return null;
  },
  em(_) {
    return null;
  },
  p(_) {
    return null;
  },
};

const subTitleConfig = {
  h1({ children }) {
    return null;
  },
  h2({ children }) {
    return <p>{children}</p>;
  },
  h3({ children }) {
    const tagH3Value = tagLi(children);
    return tagH3Value && <Tag>{tagH3Value[1]}</Tag>;
  },
  ul({ children }) {
    return <Space style={{ "padding-bottom": "1em" }}>{children}</Space>;
  },

  li({ children }) {
    const tagVal = tagLi(children);

    if (tagVal) return <Tag>{tagVal[1]}</Tag>;

    return null;
  },
  em(children) {
    return null;
  },
  p(children) {
    return null;
  },
};

const bodyConfig = {
  ul({ children }) {
    return <List>{children}</List>;
  },
  li({ children }) {
    if (tagLi(children)) return null;

    return <List.Item>{children}</List.Item>;
  },
  h1({ children }) {
    return (
      <Typography.Title h4 style={{ textWrap: "nowrap" }}>
        {children}
      </Typography.Title>
    );
  },
  h2({ children }) {
    return <Typography.Title>{children}</Typography.Title>;
  },
  h3({ children }) {
    const tagH3Value = tagLi(children);
    if (tagH3Value) {
      return;
    }
    return <Typography.Title>{children}</Typography.Title>;
  },
  // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
  em(props) {
    const { node, ...rest } = props;
    return <span style={{ color: "blue" }} {...rest} />;
  },
  p({ children }) {
    return (
      <Typography.Paragraph style={{ wrap: "nowrap" }}>
        {children}
      </Typography.Paragraph>
    );
  },
};

const MarkdownCard = ({ urls, title }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    async function fetchUrl(url) {
      const res = await fetch(url);
      const text = await res.text();
      return text;
    }

    await Promise.all(urls.map((url) => fetchUrl(url))).then((values) => {
      setContent(values);
    });
  }

  return (
    <PreviewCard
      title={title}
      preview={"Click to expand"}
      content={
        <Flex gap={20}>
          {content &&
            content.map((item) => {
              return (
                <Flex vertical>
                  <Markdown components={bodyConfig}>{item}</Markdown>
                </Flex>
              );
            })}
        </Flex>
      }
    />
  );
};

export default MarkdownCard;
