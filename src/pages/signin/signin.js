import * as S from "./signin-signup.styled.js";
import { Link } from "react-router-dom";


export function SignIn({user, setUser}) {
  
  const handleLogin = () => setUser({ user: "test" });

  const handleLogout = () => setUser(null);
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
          <S.ModalBtnEnter
            onClick={user === null ? handleLogin : handleLogout}
          >
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
