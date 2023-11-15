import { useContext } from "react";
import * as S from "./personal-data.styled";
import { CurrentUserContext } from "../../routes";

export function GetPersonalData() {
  const { handleLogout, user } = useContext(CurrentUserContext);

  return (
    <S.SidebarPersonal>
      <S.SidebarPersonalName>{user.username}</S.SidebarPersonalName>
      <S.SidebarIcon>
        <svg alt="logout" onClick={handleLogout}>
          <use xlinkHref="./img/icon/sprite.svg#logout"></use>
        </svg>
      </S.SidebarIcon>
    </S.SidebarPersonal>
  );
}
