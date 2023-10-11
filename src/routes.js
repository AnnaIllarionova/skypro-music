import { Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/signin/signin";
import { SignUp } from "./pages/signup/signup";
import { MyPlaylist } from "./pages/my-playlist/my-playlist";
import { CategoriesOfHits } from "./pages/music-collections/categories-of-hits";
import { ErrorPage } from "./pages/error-page/error-page";
import { MainPage } from "./pages/main-page/main-page.js";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/myplaylist" element={<MyPlaylist />} />
      <Route path="/categories-of-hits/:id" element={<CategoriesOfHits />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
