import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class Document extends NextDocument {

  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <html>
        <body>test</body>
      </html>
    )
  }
}

export default Document;
