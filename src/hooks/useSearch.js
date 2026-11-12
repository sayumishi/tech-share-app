import { useState, useMemo } from "react";
//useMemoは計算結果のメモ。前回の結果を使いまわす。
//依存する値が変わった時だけ再計算する。
export default function useSearch(articles) {
  const [searchQuery, setSearchQuery] = useState("");

  // articles か searchQuery が変わったときだけ、絞り込みをやり直す。
  const filteredArticles = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return searchQuery
      ? articles.filter((article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery)
      )
      : articles;
  }, [articles, searchQuery]);

  return { searchQuery, setSearchQuery, filteredArticles };
}
