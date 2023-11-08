import * as S from "./signin-signup.styled";
import { Link } from "react-router-dom";

export function SignIn({ user, setUser }) {
  const handleLogin = () => {
    localStorage.setItem("user", "test");
    const userData = localStorage.getItem("user");
    console.log(userData);
    setUser(userData);
  };

  console.log(user);
  return (
    <S.ContainerEnter>
      <S.ModalBlock>
        <S.ModalFormLogin action="#">
          <a href="../">
            <S.ModalLogo>
              <img src="../img/logo_modal.png" alt="logo" />
            </S.ModalLogo>
          </a>
          <S.ModalInputLogin type="text" name="login" placeholder="Почта" />
          <S.ModalInput type="password" name="password" placeholder="Пароль" />
          <S.ModalBtnEnter onClick={user === null && handleLogin}>
            <S.ModalBtnEnterLink to="/">Войти</S.ModalBtnEnterLink>
          </S.ModalBtnEnter>
          <S.ModalBtnSignup>
            <Link to="/signup">Зарегистрироваться</Link>
          </S.ModalBtnSignup>
        </S.ModalFormLogin>
      </S.ModalBlock>
    </S.ContainerEnter>
  );
}
