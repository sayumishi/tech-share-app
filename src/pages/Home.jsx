import { useState, useEffect } from "react";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);

  // Homeが表示されたときに、記事を全件取得する
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/articles`)

      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const { searchQuery, setSearchQuery, filteredArticles } = useSearch(articles);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="キーワードで検索（タイトル・本文）"
        className="col-span-full border border-gray-300 rounded-lg p-3 bg-white"
      />

      {filteredArticles.map((article) => (
        <Link
          key={article.id}
          to={`/articles/${article.id}`}
          className="block bg-white p-6 rounded-lg hover:shadow-md transition">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {article.title}
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            {article.author}・{article.createdAt}
          </p>
          <p className="text-gray-600 line-clamp-3">{article.content}</p>
        </Link>
      ))}
      {filteredArticles.length === 0 && (
        <p className="text-gray-500">記事がみつかりません。</p>
      )}
    </div>
  );
}

