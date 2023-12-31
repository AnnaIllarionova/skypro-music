import { GetPersonalData } from "../personal-data/personal-data.jsx";
import * as S from "./sidebar.styled";
import { categories } from "./categories.jsx";
import { SkeletonSidebar } from "../skeleton/skeleton.jsx";

export function Sidebar({ isVisiable }) {
  return (
    <S.MainSidebar>
      <GetPersonalData />
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
          {isVisiable ? (
            <S.SidebarLink to={`/categories-of-hits/${category.id}`}>
              <S.SidebarImage src={category.imgUrl} alt={category.label} />
            </S.SidebarLink>
          ) : (
            <SkeletonSidebar />
          )}
        </S.SidebarItem>
      ))}
    </>
  );
}
