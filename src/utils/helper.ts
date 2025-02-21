// Normalize API response to match NewsCardProps
export const formatArticle = (article: any) => ({
  title:
    article.title || article.webTitle || article.headline.main || "Untitled",
  description:
    article.description ||
    article.abstract ||
    article.fields?.headline ||
    article.fields?.bodyText ||
    "No description available.",
  url: article.url || article.web_url || article.fields.webUrl || "#",
  imageUrl:
    article.urlToImage ||
    article.thumbnail ||
    article.fields?.thumbnail ||
    "https://i.pinimg.com/736x/b2/a7/8b/b2a78b7520577fc3664213e22bffd2c3.jpg",
  source:
    article.source?.name ||
    article.publication ||
    article?.fields?.publication ||
    "Unknown",
  publishedAt:
    article.publishedAt || article.webPublicationDate || article.pub_date,
  author:
    article?.author ||
    article?.fields?.byline ||
    article?.byline?.original ||
    "Unknown Author",
  tag: article.pillarName || article.section_name || "General",
});
