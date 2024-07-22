import Head from "next/head"
import { useRouter } from "next/router"

export const MetaTags = ({
  title,
  description,
}: {
  title?: string,
  description?: string,
}) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title} | Culinarybook</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={`https://www.culinarybook.website${router.asPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`/api/og?title=${title}&description=${description}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`/api/og?title=${title}&description=${description}`} />
      <link rel="canonical" href={`https://www.culinarybook.website${router.asPath}`} />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, maximum-scale=5, viewport-fit=cover"
      />
    </Head>
  )
}
