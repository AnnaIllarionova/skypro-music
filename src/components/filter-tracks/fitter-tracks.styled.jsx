import styled from "styled-components";

export const CenterblockFilter = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 51px;
  max-height: 39px;
  column-gap: 10px;
`;

export const FilterTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
`;

// active?
export const FilterButton = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  border-color: ${(props) =>
    props.isAuthorClicked || props.isYearClicked || props.isGenreClicked
      ? "#9A48F1"
      : "inherit"};
  color: ${(props) =>
    props.isAuthorClicked || props.isYearClicked || props.isGenreClicked
      ? "#B672FF"
      : "inherit"};

  &:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;
  }

  &:active {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
  }
`;

/* for ListofAuthors */
export const FilterBox = styled.div`
  width: 248px;
  height: 305px;
  border-radius: 12px;
  background-color: #313131;
  border: none;
  margin: 10px;
  position: absolute;
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterBoxLinks = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
  height: 232px;
  width: 180px;
`;

export const FilterBoxLinksItem = styled.a`
  color: #fff;
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  &:hover {
    color: #b672ff;
    text-decoration-line: underline;
  }
`;
