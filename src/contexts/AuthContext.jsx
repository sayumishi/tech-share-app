import { createContext, useState, useContext } from "react";
//contextは入れ物
const AuthContext = createContext();
// AuthProviderで子コンポーネント全体に状態を提供
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // null＝未ログイン
  // ユーザーがログイン中の場合↓
  const login = () => setUser({ name: 'Tech Taro' });
  const logout = () => setUser(null);

  return (
    //valueひとつにまとめて全て渡す。受け取り側は分割代入で取り出す
    //childrenで子コンポーネントを包む
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// useAuthを使ってuser/login/logoutを利用できる。