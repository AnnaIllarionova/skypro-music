import * as S from "../signin/signin-signup.styled";

export function SignUp() {
  return (
    <S.ContainerEnter>
      <S.ModalBlock>
        <S.ModalFormLogin action="#">
          <a href="../">
            <S.ModalLogo>
              <img src="../img/logo_modal.png" alt="logo" />
            </S.ModalLogo>
          </a>
          <S.ModalInputSignup type="text" name="login" placeholder="Почта" />
          <S.ModalInputSignup
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <S.ModalInputSignup
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />
          <S.ModalBtnSignupEnt>
            <a href="../index.html">Зарегистрироваться</a>
          </S.ModalBtnSignupEnt>
        </S.ModalFormLogin>
      </S.ModalBlock>
    </S.ContainerEnter>
  );
}
