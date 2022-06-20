import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Tab.scss";
function Tab({ tabs, ...rest }) {
  let location = useLocation();
  let navigate = useNavigate();
  const selectedTabStyle = {
    backgroundColor: "#000000",
    fontWeight: 500,
    color: "white",
  };
  return (
    <Fragment>
      <div className="tab-item-wrapper">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="tab-item"
            onClick={() => navigate(`${tab.name}`, { replace: true })}
            style={
              location.pathname.split("/").pop() === tab.name
                ? selectedTabStyle
                : {}
            }
          >
            {tab.text}
          </div>
        ))}
      </div>
      <div className="tab-container">{rest.children}</div>
    </Fragment>
  );
}

export default Tab;
