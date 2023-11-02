import * as S from "./App.styled";
import { GlobalStyles } from "./global.styled";
import { AppRoutes } from "./routes";

function App() {
  return (
    <S.Wrapper>
      <AppRoutes />
      <GlobalStyles />
    </S.Wrapper>
  );
}

export default App;
