import { GetPersonalData } from "../personal-data/personal-data.jsx";
import * as S from "./sidebar.styled";
import { categories } from "./categories.jsx";
import { SkeletonSidebar } from "../skeleton/skeleton.jsx";
import { useGetSelectionsQuery } from "../../services/api-services.js";

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
  const { data } = useGetSelectionsQuery();
  // console.log(data);

  return (
    <>
      {categories.map((category) => {
        const selection =
          data && data.find((selection) => selection.id === category.id);
        // console.log(selection?.id);
        return (
          <S.SidebarItem key={category.id}>
            {isVisiable ? (
              <S.SidebarLink to={`/categories-of-hits/${selection?.id}`}>
                <S.SidebarImage src={category.imgUrl} alt={category.label} />
              </S.SidebarLink>
            ) : (
              <SkeletonSidebar />
            )}
          </S.SidebarItem>
        );
      })}
    </>
  );
}
