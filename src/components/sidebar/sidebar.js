import { GetPersonalData } from "../personal-data/personal-data.js";
import * as S from "./sidebar.styled.js";

import { categories } from "./categories.js";

export function Sidebar({ isVisiable, user, setUser }) {
  return (
    <S.MainSidebar>
      <GetPersonalData user={user} setUser={setUser} />
      <S.SidebarBlock>
        <S.SidebarList>
          <GetSidebarItems isVisiable={isVisiable} />
        </S.SidebarList>
      </S.SidebarBlock>
    </S.MainSidebar>
  );
}

function GetSidebarItems({ isVisiable }) {
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
