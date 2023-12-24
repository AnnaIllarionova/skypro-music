import React, { useContext } from "react";

export const themes = {
  light: {
    color: "#000",
    background: "#FFF",
    backgroundColor: "#F6F4F4",
    icon: "./img/lightTheme.svg",
    logoImg: "./img/logodark.png",
    burgerLineColor: "#000000",
    iconSearch: "/img/icon/sprite.svg#icon-search-black",
    borderBottomColor: "#D9D9D9",
    iconLogout: "/img/icon/sprite.svg#logout-black",
    barBackground: "rgba(255, 255, 255, 0.8)",
    progressColor: "#D9D9D9",
    backgroundNav: "#F6F5F3",
  },
  dark: {
    color: "#FFF",
    background: "#181818",
    backgroundColor: "#313131",
    icon: "./img/darkTheme.svg",
    logoImg: "/img/logo.png",
    burgerLineColor: "#d3d3d3",
    iconSearch: "/img/icon/sprite.svg#icon-search",
    borderBottomColor: "#4e4e4e",
    iconLogout: "/img/icon/sprite.svg#logout",
    barBackground: "rgba(28, 28, 28, 0.8)",
    progressColor: "#2e2e2e",
    backgroundNav: "#181818",
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);

  if (!theme) return theme.dark;

  return theme;
};
