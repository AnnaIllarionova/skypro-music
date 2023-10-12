import * as S from "./error-page.styled"

export const ErrorPage = () => {
  return (
    <S.ErrorContent>
      <S.ErrorContainer>
        <S.ErrorNumber>404</S.ErrorNumber>
        <S.ErrorSection>
          <S.ErrorTitle>Страница не найдена</S.ErrorTitle>
          <img src="./img/smile_crying.svg" alt="smile_crying" />
        </S.ErrorSection>
        <S.ErrorText>
          Возможно, она была удалена
          <br /> или перенесена на другой адрес
        </S.ErrorText>
        <S.ErrorBtnBackToMain>
          <S.ErrorLinkToMain to="/">
            Вернуться на главную
          </S.ErrorLinkToMain>
        </S.ErrorBtnBackToMain>
      </S.ErrorContainer>
    </S.ErrorContent>
  );
};
