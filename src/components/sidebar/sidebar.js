import { GetPersonalData } from "../personal-data/personal-data.js";
import "./sidebar.css";

export function Sidebar() {
  return (
    <div className="main__sidebar sidebar">
      <GetPersonalData />
      <div className="sidebar__block">
        <div className="sidebar__list">
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
        </div>
      </div>
    </div>
  );
}

function GetSidebarItem(props) {
  return (
    <div className="sidebar__item">
      <a className="sidebar__link" href="#">
        <img className="sidebar__img" src={props.imgUrl} alt={props.label} />
      </a>
    </div>
  );
}

