import { useState } from "react";
import * as S from "./navigation.styled";

export function Navigation() {
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
      {showMenu && <PopUpMenu />}
    </S.MainNav>
  );
}

function PopUpMenu() {
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
          <S.MenuLink to="/signin">Войти</S.MenuLink>
        </S.MenuItem>
      </S.MenuList>
    </S.NavMenu>
  );
}
