import { Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/signin/signin";
import { SignUp } from "./pages/signup/signup";
import { MyPlaylist } from "./pages/my-playlist/my-playlist";
import { CategoriesOfHits } from "./pages/music-collections/categories-of-hits";
import { ErrorPage } from "./pages/error-page/error-page";
import { MainPage } from "./pages/main-page/main-page.js";
import { ProtectedRoute } from "./components/protected-route/protected-route";
import { useState } from "react";

export const AppRoutes = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/" element={<MainPage user={user} setUser={setUser} />} />
        <Route path="/myplaylist" element={<MyPlaylist />} />
        <Route path="/categories-of-hits/:id" element={<CategoriesOfHits />} />
      </Route>
      <Route
        path="/signin"
        element={<SignIn user={user} setUser={setUser} />}
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
