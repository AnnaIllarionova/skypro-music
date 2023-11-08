import { useState } from "react";
import * as S from "./navigation.styled";
import { useThemeContext } from "../themes/theme-context";

export function Navigation({ user, setUser }) {
  const [showMenu, setShowMenu] = useState(false);
  const { theme } = useThemeContext();

  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }
  return (
    <S.MainNav style={{ backgroundColor: theme.background }}>
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
  const { toggleTheme } = useThemeContext();
  const { theme } = useThemeContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
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
