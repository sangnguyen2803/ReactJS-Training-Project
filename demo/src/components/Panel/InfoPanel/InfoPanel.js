import store from "store";
import { useSnapshot } from "valtio";
import { useState, useEffect } from "react";
import "../Panel.scss";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function InfoPanel(props) {
  const { isEditing, teams } = useSnapshot(store);
  const [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    setEditStatus(isEditing);
  }, [isEditing]);
  const [team, setTeam] = useState();
  useEffect(() => {
    setTeam(teams);
  }, [teams]);
  const [data] = useOutletContext();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({
      ...formData,
      startDay: data?.startDay,
      teamId: data?.teamId,
      address: data?.address,
      moneyPerHour: data?.moneyPerHour,
    });
  }, [editStatus, data]);

  const handleSubmitForm = () => {
    console.log(formData);
  };
  return (
    <div className="panel-container">
      <span className="main-text-large" style={{ marginBottom: 20 }}>
        Information
      </span>
      <div className="input-container" style={{ flexDirection: "row" }}>
        <div className="pd-left-side-item" style={{ position: "relative" }}>
          <img
            className="pd-image"
            alt="profile_image"
            src={"https://images6.alphacoders.com/104/1042578.png"}
          />
          <div className="pd-sub-info">
            <span className="main-text-small">{data?.fullName}</span>
            <span className="sub-text-medium">{data?.phone}</span>
            <span className="sub-text-large">{data?.teamId}</span>
          </div>
        </div>
        <div className="input-form-wrapper">
          <div className="form-group-wrapper">
            <div className="input-wrapper">
              <span className="du-form-label">Start date</span>
              <input
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, startDay: e.target.value })
                }
                name="start_at"
                value={editStatus ? formData?.startDay : data?.startDay}
                className="p-pd-b-iu-input-general"
                placeholder={"Enter your full name"}
                disabled={!isEditing}
              />
            </div>
            <div className="input-wrapper">
              <span className="du-form-label">Team</span>
              <select
                name="team"
                value={
                  editStatus
                    ? store.getTeamNameByTeamId(formData?.teamId)
                    : data?.teamId
                }
                className="p-pd-b-iu-input-general"
                onChange={(e) =>
                  setFormData({ ...formData, teamId: e.target.value })
                }
                disabled={!isEditing}
              >
                {team?.map((item, index) => (
                  <option key={index} value={item?.team_id}>
                    {item?.teamname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group-wrapper">
            <div className="input-wrapper">
              <span className="du-form-label">Address</span>
              <input
                type="text"
                name="address"
                value={editStatus ? formData?.address : data?.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="p-pd-b-iu-input-general"
                disabled={!isEditing}
              />
            </div>
            <div className="input-wrapper">
              <span className="du-form-label">Hourly pay</span>
              <input
                type="text"
                name="monthly_salary"
                value={editStatus ? formData?.moneyPerHour : data?.moneyPerHour}
                onChange={(e) =>
                  setFormData({ ...formData, moneyPerHour: e.target.value })
                }
                className="p-pd-b-iu-input-general"
                placeholder={"Salary per hour"}
                disabled={!isEditing}
              />
            </div>
          </div>{" "}
          <div className="btn-submit-form-wrapper">
            {editStatus && (
              <button className="btn-submit-form" onClick={handleSubmitForm}>
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
