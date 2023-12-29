import { useState } from "react";
import * as S from "../signin/signin-signup.styled";
import { authorizationForNewUser } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useGetTokenMutation } from "../../services/api-services";

export function SignUp({ setUser }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isNewUserLoading, setIsNewUserLoading] = useState(false);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();
  const [getToken] = useGetTokenMutation();

  const handleAuthorizationNewUser = async (e) => {
    e.preventDefault();
    
    try {
      if (password !== repeatPassword) {
        throw new Error("Пароли не совпадают!");
      }
      setIsNewUserLoading(true);
      const dataNewUser = await authorizationForNewUser({
        email: email,
        password: password,
        username: login,
      });
      localStorage.setItem("user", JSON.stringify(dataNewUser));
      setUser(dataNewUser);
      
      const accessToken = await getToken({ email: email, password: password });
      localStorage.setItem(
        "accessToken",
        JSON.stringify(accessToken.data.access),
      );

      localStorage.setItem(
        "refreshToken",
        JSON.stringify(accessToken.data.refresh),
      );
      console.log(localStorage.getItem("refreshToken"));
      
      navigate("/");
      
    } catch (error) {
      setShowError(error.message);
      setIsNewUserLoading(false);
    }
  };

  return (
    <S.ContainerEnter>
      <S.ModalBlock>
        <S.ModalFormLogin action="#">
          <a href="../">
            <S.ModalLogo>
              <img src="../img/logo_modal.png" alt="logo" />
            </S.ModalLogo>
          </a>
          <S.ModalInputSignup
            type="text"
            name="login"
            placeholder="Имя"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <S.ModalInputSignup
            type="email"
            name="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <S.ModalInputSignup
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <S.ModalInputSignup
            type="password"
            name="repeat-password"
            placeholder="Повторите пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <p style={{ color: "red", paddingBottom: "15px" }}>{showError}</p>
          <S.ModalBtnSignupEnt
            disabled={isNewUserLoading}
            onClick={handleAuthorizationNewUser}
            isNewUserLoading={isNewUserLoading}
          >
            <S.ModalBtnSignupEntLink>
              {isNewUserLoading ? "Регистрируем..." : "Зарегистрироваться"}
            </S.ModalBtnSignupEntLink>
          </S.ModalBtnSignupEnt>
        </S.ModalFormLogin>
      </S.ModalBlock>
    </S.ContainerEnter>
  );
}
