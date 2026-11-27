import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuthStore } from "./store/authStore";
import Catalog from "./pages/Catalog/Catalog";


function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link>
        {" | "}
        <Link to="/catalog">Каталог</Link>
        {" | "}
        <Link to="/cart">Корзина</Link>
        {" | "}
        <Link to="/login">Войти</Link>
      </nav>

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
            element={<Catalog />}
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
    </BrowserRouter>
  );
}

export default App;