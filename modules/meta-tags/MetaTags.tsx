import Head from "next/head"
import { useRouter } from "next/router"

export const MetaTags = ({
  title,
  description,
  ogImage,
}: {
  title?: string,
  description?: string,
  ogImage?: string,
}) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title} | Culinarybook</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, maximum-scale=5, viewport-fit=cover"
      />
      <meta charSet="utf-8" />
      <meta property="og:url" content={`https://www.culinarybook.website${router.asPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={'@culinarybook'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={`https://www.culinarybook.website${router.asPath}`} />
    </Head>
  )
}
