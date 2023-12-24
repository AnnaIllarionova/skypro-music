import { useState } from "react";
import * as S from "./navigation.styled";
import { useThemeContext } from "../context/theme-context";
import { useContext } from "react";
import { CurrentUserContext } from "../../routes";
import { Link } from "react-router-dom";

export function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const { theme } = useThemeContext();

  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }
  return (
    <S.MainNav theme={theme}>
      <S.NavLogo >
        <Link to="/">
          <S.LogoImage src={theme.logoImg} alt="logo" />
        </Link>
      </S.NavLogo>
      <S.NavBurger onClick={handleShowMenu}>
        <S.BurgerLine theme={theme}></S.BurgerLine>
        <S.BurgerLine theme={theme}></S.BurgerLine>
        <S.BurgerLine theme={theme}></S.BurgerLine>
      </S.NavBurger>
      {showMenu && <PopUpMenu />}
    </S.MainNav>
  );
}

function PopUpMenu() {
  const { toggleTheme, theme } = useThemeContext();
  const {handleLogout, user} = useContext(CurrentUserContext);

  return (
    <S.NavMenu>
      <S.MenuList>
        <S.MenuItem>
          <S.MenuLink style={{ color: theme.color }} to="/">
            Главное
          </S.MenuLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.MenuLink style={{ color: theme.color }} to="/myplaylist">
            Мой плейлист
          </S.MenuLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.MenuLink
            style={{ color: theme.color }}
            to="/signin"
            onClick={user !== null && handleLogout}
          >
            Выйти
          </S.MenuLink>
        </S.MenuItem>
        <S.MenuItem onClick={toggleTheme}><img src={theme.icon} alt="switch theme"/></S.MenuItem>
      </S.MenuList>
    </S.NavMenu>
  );
}
