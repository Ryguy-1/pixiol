import "server-only";
import { Entry, EntryCollection } from "contentful";
import { ContentfulCategory, client } from "@/api/contentful";
import { PersistedNewsArticle } from "@/api/data-structures";
import { extractContentfulCategoryInformation } from "./utils";

export async function fetchArticles(): Promise<PersistedNewsArticle[]> {
  const entries: EntryCollection<ContentfulCategory> = await client.getEntries({
    content_type: "newsArticle",
  });
  const articleList: PersistedNewsArticle[] = entries.items.map((item) => {
    return extractContentfulCategoryInformation(item);
  });
  return articleList;
}

export async function fetchArticleById(
  articleId: string
): Promise<PersistedNewsArticle> {
  const entry: Entry<ContentfulCategory> = await client.getEntry(articleId);
  return extractContentfulCategoryInformation(entry);
}

export async function fetchMostRecentArticles(
  limit?: number
): Promise<PersistedNewsArticle[]> {
  const entries: EntryCollection<ContentfulCategory> = await client.getEntries({
    content_type: "newsArticle",
    order: ["-sys.createdAt"],
    limit: limit,
  });
  const articleList: PersistedNewsArticle[] = entries.items.map((item) => {
    return extractContentfulCategoryInformation(item);
  });
  return articleList;
}

export async function fetchArticlesByCategory(
  categoryId: string,
  limit?: number
): Promise<PersistedNewsArticle[]> {
  const entries: EntryCollection<ContentfulCategory> = await client.getEntries({
    content_type: "newsArticle",
    "fields.categories.sys.id": categoryId,
    order: ["-sys.createdAt"],
    limit: limit,
  });
  const articleList: PersistedNewsArticle[] = entries.items.map((item) => {
    return extractContentfulCategoryInformation(item);
  });
  return articleList;
}

export async function fetchArticlesBySearch(
  query: string,
  limit?: number
): Promise<PersistedNewsArticle[]> {
  const entries: EntryCollection<ContentfulCategory> = await client.getEntries({
    content_type: "newsArticle",
    query,
    order: ["-sys.createdAt"],
    limit: limit,
  });
  const articleList: PersistedNewsArticle[] = entries.items.map((item) => {
    return extractContentfulCategoryInformation(item);
  });
  return articleList;
}
