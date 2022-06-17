import { Outlet } from "react-router-dom";
import "./ProfileDetail.scss";
import Tab from "./Tab";
function ProfileDetail(props) {
  const { employee, advances } = props;
  const tabs = [
    { text: "Information", name: "info" },
    { text: "Working", name: "working" },
    { text: "Advances", name: "advances" },
    { text: "Statistics", name: "statistics" },
  ];
  return (
    <div className="pd-container">
      <div className="pd-left-side-item" style={{ position: "relative" }}>
        <img
          className="pd-image"
          alt="profile_image"
          src={employee.profile_image}
        />
        <div className="pd-sub-info">
          <span className="main-text-small">{employee.full_name}</span>
          <span className="sub-text-medium">{employee.phone}</span>
          <span className="sub-text-large">{employee.team}</span>
        </div>
      </div>
      <div className="pd-right-side-item">
        <Tab tabs={tabs} children={<Outlet context={[employee]} />} />
      </div>
    </div>
  );
}

export default ProfileDetail;
