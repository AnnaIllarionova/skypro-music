import "./personal-data.css"

export function GetPersonalData() {
    return (
      <div className="sidebar__personal">
        <p className="sidebar__personal-name">Sergey.Ivanov</p>
        <div className="sidebar__icon">
          <svg alt="logout">
            <use xlinkHref="./img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
    );
  }