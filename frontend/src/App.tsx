import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

import { Header } from "./components/Header/Header";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>

      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={<h1>Главная страница</h1>}
          />

          <Route
            path="/login"
            element={
              user
                ? <Navigate to="/" replace />
                : <h1>Авторизация</h1>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/catalog"
              element={<h1>Каталог товаров</h1>}
            />

            <Route
              path="/cart"
              element={<h1>Корзина</h1>}
            />
          </Route>

          <Route
            path="*"
            element={<h1>Страница не найдена</h1>}
          />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;