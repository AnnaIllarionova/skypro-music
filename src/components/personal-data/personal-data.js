import * as S from "./personal-data.styled";

export function GetPersonalData({user, setUser}) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <S.SidebarPersonal>
      <S.SidebarPersonalName>Sergey.Ivanov</S.SidebarPersonalName>
      <S.SidebarIcon>
        <svg alt="logout" onClick={user !== null && handleLogout}>
          <use xlinkHref="./img/icon/sprite.svg#logout"></use>
        </svg>
      </S.SidebarIcon>
    </S.SidebarPersonal>
  );
}
