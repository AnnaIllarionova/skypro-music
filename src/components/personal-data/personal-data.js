import * as S from "./personal-data.styled";

export function GetPersonalData() {
  return (
    <S.SidebarPersonal>
      <S.SidebarPersonalName>Sergey.Ivanov</S.SidebarPersonalName>
      <S.SidebarIcon>
        <svg alt="logout">
          <use xlinkHref="./img/icon/sprite.svg#logout"></use>
        </svg>
      </S.SidebarIcon>
    </S.SidebarPersonal>
  );
}
