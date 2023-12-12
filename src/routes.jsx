import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { SignIn } from "./pages/signin/signin";
import { SignUp } from "./pages/signup/signup";
import { MyPlaylist } from "./pages/my-playlist/my-playlist";
import { CategoriesOfHits } from "./pages/music-collections/categories-of-hits";
import { ErrorPage } from "./pages/error-page/error-page";
import { MainPage } from "./pages/main-page/main-page.jsx";
import { ProtectedRoute } from "./components/protected-route/protected-route";
import React, { useEffect, useState } from "react";
import { loginUser } from "./Api";
import { ThemeContext, themes } from "./components/context/theme-context.jsx";
import { useGetTokenMutation } from "./services/api-services.js";
import { AllTracksComponent } from "./components/playlist/all-tracks-component.jsx";

export const CurrentUserContext = React.createContext(null);

export const AppRoutes = () => {
  const getUserFromLS = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const [user, setUser] = useState(getUserFromLS());
  const [showError, setShowError] = useState("");
  const [isVisiable, setIsVisiable] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes.dark);

  const toggleTheme = () => {
    if (currentTheme === themes.dark) {
      setCurrentTheme(themes.light);
      console.log("theme light");
      return;
    }
    console.log("theme dark");
    setCurrentTheme(themes.dark);
  };

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [getToken] = useGetTokenMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsUserLoading(true);
      const userData = await loginUser({ email: email, password: password });
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      const accessToken = await getToken({ email: email, password: password });
      localStorage.setItem(
        "accessToken",
        JSON.stringify(accessToken.data.access),
      );
      console.log(JSON.parse(localStorage.getItem("accessToken")));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(accessToken.data.refresh),
      );
      console.log(localStorage.getItem("refreshToken"));

      navigate("/");
    } catch (error) {
      setShowError(error.message);
    } finally {
      setIsUserLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPassword("");
    setEmail("");
    navigate("/signin");
  };

  const [title, setTitle] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFilterTracks, setShowFilterTracks] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Треки");
      setShowFilterTracks(true);
      setShowSidebar(true);
    }

    if (location.pathname === "/myplaylist") {
      setTitle("Мои треки");
      setShowFilterTracks(false);
      setShowSidebar(false);
    }

    if (location.pathname.startsWith("/categories-of-hits/")) {
      setShowFilterTracks(false);
      setShowSidebar(false);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route
          path="/"
          element={
            <CurrentUserContext.Provider value={{ handleLogout, user }}>
              <ThemeContext.Provider
                value={{ theme: currentTheme, toggleTheme }}
              >
                <MainPage
                  isVisiable={isVisiable}
                  setIsVisiable={setIsVisiable}
                  showSidebar={showSidebar}
                  showFilterTracks={showFilterTracks}
                  title={title}
                />
              </ThemeContext.Provider>
            </CurrentUserContext.Provider>
          }
        >
          <Route
            path="/"
            element={<AllTracksComponent isVisiable={isVisiable} />}
          />
          <Route
            path="/myplaylist"
            element={<MyPlaylist isVisiable={isVisiable} />}
          />
          <Route
            path="/categories-of-hits/:id"
            element={<CategoriesOfHits setTitle={setTitle} />}
          />
        </Route>
      </Route>
      <Route
        path="/signin"
        element={
          <CurrentUserContext.Provider value={{ handleLogin }}>
            <SignIn
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isUserLoading={isUserLoading}
              showError={showError}
            />
          </CurrentUserContext.Provider>
        }
      />
      <Route path="/signup" element={<SignUp setUser={setUser} />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
