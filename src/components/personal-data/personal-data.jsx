import { useContext } from "react";
import * as S from "./personal-data.styled";
import { CurrentUserContext } from "../../routes";
import { useThemeContext } from "../context/theme-context";

export function GetPersonalData() {
  const { handleLogout, user } = useContext(CurrentUserContext);
  const{theme} = useThemeContext();

  return (
    <S.SidebarPersonal>
      <S.SidebarPersonalName theme={theme}>{user.username}</S.SidebarPersonalName>
      <S.SidebarIcon theme={theme}>
        <svg alt="logout" onClick={handleLogout}>
          <use xlinkHref={theme.iconLogout}></use>
        </svg>
      </S.SidebarIcon>
    </S.SidebarPersonal>
  );
}
