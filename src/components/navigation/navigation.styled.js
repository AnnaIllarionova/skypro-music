import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainNav = styled.nav`
  width: 244px;
  background-color: ${props=>props.theme.backgroundNav};
  padding: 20px 0 20px 36px;
`;

export const NavLogo = styled.div`
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
`;

export const LogoImage = styled.img`
  width: 113.33px;
  height: 17px;
  color: #181818;
`;

export const NavBurger = styled.div`
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  box-orient: vertical;
  box-direction: normal;
  flex-direction: column;
  box-pack: justify;
  flex-pack: justify;
  justify-content: space-between;
`;

export const BurgerLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.burgerLineColor};
`;

export const NavMenu = styled.div`
  display: block;
  visibility: visible;
`;
export const MenuList = styled.ul`
  padding: 18px 0 10px 0;
`;

export const MenuItem = styled.li`
  padding: 5px 0;
  margin-bottom: 16px;
`;

export const MenuLink = styled(Link)`
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
