import { Routes, Route, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/signin/signin";
import { SignUp } from "./pages/signup/signup";
import { MyPlaylist } from "./pages/my-playlist/my-playlist";
import { CategoriesOfHits } from "./pages/music-collections/categories-of-hits";
import { ErrorPage } from "./pages/error-page/error-page";
import { MainPage } from "./pages/main-page/main-page.jsx";
import { ProtectedRoute } from "./components/protected-route/protected-route";
import React, { useEffect, useState } from "react";
import { getAllTrackFromApi, loginUser } from "./Api";
import { ThemeContext, themes } from "./components/context/theme-context.jsx";

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
  const [apiTracks, setApiTracks] = useState([]);
  const [addTracksGottenError, setAddTracksGottenError] = useState(null);
  const [showError, setShowError] = useState("");

  useEffect(() => {
    
    getAllTrackFromApi()
      .then((apiTracks) => {
        console.log(apiTracks);
        setApiTracks(apiTracks);
      })
      .catch((error) => {
        console.log(error.message);
        setAddTracksGottenError(error.message);
      });
  }, []);

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
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("click");
    try {
      setIsUserLoading(true);
      const userData = await loginUser({ email: email, password: password });
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
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
  };

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
                  user={user}
                  setUser={setUser}
                  apiTracks={apiTracks}
                  addTracksGottenError={addTracksGottenError}
                />
              </ThemeContext.Provider>
            </CurrentUserContext.Provider>
          }
        />
        <Route path="/myplaylist" element={<MyPlaylist />} />
        <Route path="/categories-of-hits/:id" element={<CategoriesOfHits />} />
      </Route>
      <Route
        path="/signin"
        element={
          <CurrentUserContext.Provider value={{ handleLogin }}>
            <SignIn
              user={user}
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
      <Route
        path="/signup"
        element={<SignUp user={user} setUser={setUser} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
