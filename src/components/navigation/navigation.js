import { useState } from "react";
import * as S from "./navigation.styled";

export function Navigation({ user, setUser }) {
  const [showMenu, setShowMenu] = useState(false);

  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }
  return (
    <S.MainNav>
      <S.NavLogo>
        <S.LogoImage src="./img/logo.png" alt="logo" />
      </S.NavLogo>
      <S.NavBurger onClick={handleShowMenu}>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
      </S.NavBurger>
      {showMenu && <PopUpMenu user={user} setUser={setUser} />}
    </S.MainNav>
  );
}

function PopUpMenu({ user, setUser }) {
  const handleLogin = () => setUser({ user: "test" });

  const handleLogout = () => setUser(null);
  console.log(user);
  return (
    <S.NavMenu>
      <S.MenuList>
        <S.MenuItem>
          <S.MenuLink to="/">Главное</S.MenuLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.MenuLink to="/myplaylist">Мой плейлист</S.MenuLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.MenuLink
            to="/signin"
            onClick={user !== null ? handleLogout : handleLogin}
          >
            Выйти
          </S.MenuLink>
        </S.MenuItem>
      </S.MenuList>
    </S.NavMenu>
  );
}
