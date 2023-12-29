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
  color: ${(props) => props.theme.color};
`;

export const FilterButton = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${(props) => props.theme.color};
  color: ${(props) => props.theme.color};
  border-radius: 60px;
  padding: 6px 20px;
  border-color: ${(props) =>
    props.isAuthorClicked || props.isYearClicked || props.isGenreClicked
      ? "#9A48F1"
      : props.theme.color};
  color: ${(props) =>
    props.isAuthorClicked || props.isYearClicked || props.isGenreClicked
      ? "#B672FF"
      : props.theme.color};

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

export const FilterList = styled.div`
  position: relative;
`;

export const FilterButtonNumber = styled.button`
  background-color: #9a48f1;
  border-radius: 50%;
  border-color: #9a48f1;
  width: 26px;
  height: 26px;
  position: absolute;
  z-index: 1;
  top: -10px;
  right: -10px;
`;

/* for ListofAuthors */
export const FilterBox = styled.div`
  width: 248px;
  height: 305px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.backgroundColor};
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
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${(props) =>
    (props.isAuthor && props.isAuthorSelected) ||
    (props.isDateOfRelease && props.isSelected) ||
    (props.isGenre && props.isGenreSelected)
      ? "#b672ff"
      : props.theme.color};
  text-decoration-line: ${(props) =>
    (props.isAuthor && props.isAuthorSelected) ||
    (props.isDateOfRelease && props.isSelected) ||
    (props.isGenre && props.isGenreSelected)
      ? "underline"
      : "none"};
  &:hover {
    color: #b672ff;
    text-decoration-line: underline;
  }
`;
