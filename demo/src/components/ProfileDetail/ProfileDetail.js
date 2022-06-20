import { Outlet } from "react-router-dom";
import "./ProfileDetail.scss";
import Tab from "./Tab";
function ProfileDetail(props) {
  const { data } = props;
  const tabs = [
    { text: "Information", name: "info" },
    { text: "Working", name: "working" },
    { text: "Advances", name: "advances" },
    { text: "Statistics", name: "statistics" },
  ];
  return (
    <div className="pd-container">
      <div className="pd-right-side-item">
        <Tab tabs={tabs} children={<Outlet context={[data]} />} />
      </div>
    </div>
  );
}

export default ProfileDetail;
