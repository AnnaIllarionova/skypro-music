import { useState } from "react";
import * as S from "./navigation.styled";
import { useThemeContext } from "../context/theme-context";
import { useContext } from "react";
import { CurrentUserContext } from "../../routes";

export function Navigation({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const { theme } = useThemeContext();

  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }
  return (
    <S.MainNav theme={theme}>
      <S.NavLogo>
        <S.LogoImage src={theme.logoImg} alt="logo" />
      </S.NavLogo>
      <S.NavBurger onClick={handleShowMenu}>
        <S.BurgerLine theme={theme}></S.BurgerLine>
        <S.BurgerLine theme={theme}></S.BurgerLine>
        <S.BurgerLine theme={theme}></S.BurgerLine>
      </S.NavBurger>
      {showMenu && <PopUpMenu user={user}  />}
    </S.MainNav>
  );
}

function PopUpMenu({ user }) {
  const { toggleTheme } = useThemeContext();
  const { theme } = useThemeContext();
  const{handleLogout} = useContext(CurrentUserContext);

  console.log(user);

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
        <S.MenuItem onClick={toggleTheme}>{theme.icon}</S.MenuItem>
      </S.MenuList>
    </S.NavMenu>
  );
}
