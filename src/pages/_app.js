import React from "react";
import App from "next/app";
import { MDXProvider } from "@mdx-js/react";

import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";
import { mdx } from "@mdx-js/react";

function Code({ children, className }) {
  const language = className.replace(/language-/, "");
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            overflow: "scroll",
            marginTop: 20,
            marginBottom: 20,
            padding: 16
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

const components = {
  code: Code
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MDXProvider components={components}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Component {...pageProps} />
        </div>
      </MDXProvider>
    );
  }
}

export default MyApp;
