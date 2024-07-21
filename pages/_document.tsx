import Document, { Head, Html, Main, NextScript } from "next/document";

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            rel="icon"
            href={'/icons/app-icon.svg'}
            type="image/svg+xml"
          />
          <link
            rel="icon"
            href={'/favicon.ico'}
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href={'/favicon.ico'}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={'/icons/apple-touch-icon.png'}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={'/icons/apple-touch-icon.png'}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={'/icons/apple-touch-icon.png'}
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Culinarybook" />
        </Head>
        <body>
          <Main />
          <NextScript></NextScript>
        </body>
      </Html>
    )
  }
}

export default AppDocument;
