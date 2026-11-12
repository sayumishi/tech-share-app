import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
//useAuthはログイン中のユーザーを取り出す

export default function Editor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const isEditMode = Boolean(id);//編集かどうか。新規はfalse
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetch(`${import.meta.env.VITE_API_URL}/articles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title)
          setContent(data.content)
        })
    }
  }, [id, isEditMode])

  if (!user) {
    return <Navigate to="/" replace />
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('タイトルと本文を入力してください。');

    const articleData = {
      title,
      content,
      author: user.name,
      createdAt: isEditMode ? undefined : new Date().toISOString().split('T')[0],
      //新規のみ日付セット
    };

    const url = isEditMode ? `${import.meta.env.VITE_API_URL}/articles/${id}` : `${import.meta.env.VITE_API_URL}/articles`;;
    const method = isEditMode ? 'PATCH' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData),
    });
    navigate('/');
  }

  return (
    //isEditMode ? A : B は「編集モードなら A、そうでなければ B」
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{isEditMode ? '記事を編集' : '新規投稿'}</h1>
      <input
        type="text"
        placeholder="タイトルを入力"
        className="w-full px-4 py-3 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold mb-4"
        //mb-4は下側余白タイトル欄と下の枠までの間を空ける
        value={title}
        onChange={(e) => setTitle(e.target.value)}

      />

      <div className="flex gap-6">
        <textarea
          placeholder="マークダウンで本文を入力"
          className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono h-[480px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}

        />

        <div className="flex-1 p-4 border rounded-lg bg-white overflow-y-auto prose max-w-none h-[480px]">
          {content ? <ReactMarkdown>{content}</ReactMarkdown> : <p className="text-gray-400">プレビュー領域</p>}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
        {isEditMode ? '更新する' : '投稿する'}
      </button>

    </div>
  );
}

