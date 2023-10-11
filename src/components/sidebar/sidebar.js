import { GetPersonalData } from "../personal-data/personal-data.js";
import * as S from "./sidebar.styled.js";
import { useState } from "react";
import { categories } from "./categories.js";

export function Sidebar() {
  return (
    <S.MainSidebar>
      <GetPersonalData />
      <S.SidebarBlock>
        <S.SidebarList>
          <GetSidebarItems />
        </S.SidebarList>
      </S.SidebarBlock>
    </S.MainSidebar>
  );
}

function GetSidebarItems() {
  const [isVisiable, setIsVisiable] = useState(false);
  setTimeout(() => {
    setIsVisiable(true);
  }, 3000);

  return (
    <>
      {categories.map((category) => (
        <S.SidebarItem key={category.id}>
          {isVisiable && (
            <S.SidebarLink to={`/categories-of-hits/${category.id}`}>
              <S.SidebarImage src={category.imgUrl} alt={category.label} />
            </S.SidebarLink>
          )}
        </S.SidebarItem>
      ))}
    </>
  );
}
