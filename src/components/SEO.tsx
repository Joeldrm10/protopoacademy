import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  path?: string;
}

const SITE_URL = "https://protopoacademy.lovable.app";
const DEFAULT_IMAGE = "/og-image.jpg";

const SEO = ({ title, description, ogTitle, ogDescription, ogImage, path = "" }: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ? (ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`) : `${SITE_URL}${DEFAULT_IMAGE}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
