import * as S from "./App.styled.js";
import { GlobalStyles } from "./global.styled.js";
import { AppRoutes } from "./routes.js";

function App() {
  return (
    <S.Wrapper>
      <AppRoutes />
      <GlobalStyles />
    </S.Wrapper>
  );
}

export default App;
