import * as S from "./App.styled.js";
import { GlobalStyles } from "./global.styled.js";
import { AppRoutes } from "./routes.js";

function App({ user }) {
  
  return (
    <S.Wrapper>
      <AppRoutes user={user} />
      <GlobalStyles />
    </S.Wrapper>
  );
}

export default App;
