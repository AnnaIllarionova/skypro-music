import { useContext } from "react";
import * as S from "./signin-signup.styled";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../routes";

export function SignIn({
  email,
  setEmail,
  password,
  setPassword,
  isUserLoading,
  showError,
}) {
  const { handleLogin } = useContext(CurrentUserContext);

  return (
    <S.ContainerEnter>
      <S.ModalBlock>
        <S.ModalFormLogin action="#">
          <a href="../">
            <S.ModalLogo>
              <img src="../img/logo_modal.png" alt="logo" />
            </S.ModalLogo>
          </a>
          <S.ModalInputLogin
            type="text"
            name="login"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <S.ModalInput
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{ color: "red", paddingTop: "15px" }}>{showError}</p>
          <S.ModalBtnEnter
            disabled={isUserLoading}
            onClick={handleLogin}
            isUserLoading={isUserLoading}
          >
            <S.ModalBtnEnterLink>
              {isUserLoading ? "Входим..." : "Войти"}
            </S.ModalBtnEnterLink>
          </S.ModalBtnEnter>
          <S.ModalBtnSignup disabled={isUserLoading}>
            <Link to="/signup">Зарегистрироваться</Link>
          </S.ModalBtnSignup>
        </S.ModalFormLogin>
      </S.ModalBlock>
    </S.ContainerEnter>
  );
}
