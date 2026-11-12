import { BrowserRouter, Routes, Route } from 'react-router-dom'
// アプリ全体を司るファイル
import { AuthProvider } from './contexts/AuthContext'
//ログイン状態を使えるようにする
import Layout from './components/templates/Layout'
import Home from './pages/Home'
import Article from './pages/Article'
import Editor from './pages/Editor'

//<authProviderで全体を包む。全てのコンポーネントが使える。
// <BrowserRouter>でなかのルーティングが使えるようになる。
// RoutesのなかはRouteのelementLayoutで使いたいページを全部囲う。
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="articles/:id" element={<Article />} />
            <Route path="create" element={<Editor />} />
            <Route path="edit/:id" element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}