import { Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/signin/signin";
import { SignUp } from "./pages/signup/signup";
import { MyPlaylist } from "./pages/my-playlist/my-playlist";
import { CategoriesOfHits } from "./pages/music-collections/categories-of-hits";
import { ErrorPage } from "./pages/error-page/error-page";
import { MainPage } from "./pages/main-page/main-page.js";
import { ProtectedRoute } from "./components/protected-route/protected-route";
import { useEffect, useState } from "react";
import { getAllTrackFromApi } from "./Api";

export const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const [apiTracks, setApiTracks] = useState([]);
  const [addTracksGottenError, setAddTracksGottenError] = useState(null);

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

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route
          path="/"
          element={
            <MainPage
              user={user}
              setUser={setUser}
              apiTracks={apiTracks}
              addTracksGottenError={addTracksGottenError}
            />
          }
        />
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
