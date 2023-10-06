import { GetPersonalData } from "../personal-data/personal-data.js";
import * as S from "./sidebar.styled.js";
import { useState } from "react";

export function Sidebar() {
  return (
    <S.MainSidebar className="sidebar">
      <GetPersonalData />
      <S.SidebarBlock>
        <S.SidebarList>
          <GetSidebarItem
            imgUrl="./img/playlist01.png"
            label="day's playlist"
          />
          <GetSidebarItem
            imgUrl="./img/playlist02.png"
            label="day's playlist"
          />
          <GetSidebarItem
            imgUrl="./img/playlist03.png"
            label="day's playlist"
          />
        </S.SidebarList>
      </S.SidebarBlock>
    </S.MainSidebar>
  );
}

function GetSidebarItem(props) {
  const [isVisiable, setIsVisiable] = useState(false);
  setTimeout(() => {
    setIsVisiable(true);
  }, 3000);
  return (
    <S.SidebarItem>
      {isVisiable && (
        <S.SidebarLink href="#">
          <S.SidebarImage src={props.imgUrl} alt={props.label} />
        </S.SidebarLink>
      )}
    </S.SidebarItem>
  );
}
