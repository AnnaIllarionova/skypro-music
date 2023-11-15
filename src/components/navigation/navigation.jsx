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
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
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
          <S.MenuLink to="/signin" onClick={user !== null && handleLogout}>
            Выйти
          </S.MenuLink>
        </S.MenuItem>
        {/* <S.MenuItem>
          <svg alt="dark-theme">
            <use xlinkHref="img/icon/sprite.svg#icon-dark-theme"></use>
          </svg>
        </S.MenuItem> */}
      </S.MenuList>
    </S.NavMenu>
  );
}
