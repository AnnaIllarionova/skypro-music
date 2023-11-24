import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonSidebar = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#696969">
      <Skeleton height={150} width={250} />
    </SkeletonTheme>
  );
};

export const SkeletonTrackImage = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#696969">
      <Skeleton height={51} width={51} />
    </SkeletonTheme>
  );
};

export const SkeletonTrackTitleText = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#696969">
      <Skeleton height={24} width={225} />
    </SkeletonTheme>
  );
};

export const SkeletonTrackTime = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#696969">
      <Skeleton height={24} width={60} />
    </SkeletonTheme>
  );
};
