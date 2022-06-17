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
  const [employee, working] = useOutletContext();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({
      ...formData,
      start_at: employee.start_at,
      team: employee.team,
      address: employee.address,
      monthly_salary: employee.monthly_salary,
    });
  }, [editStatus, employee]);

  const handleSubmitForm = () => {
    console.log(formData);
  };
  return (
    <div className="panel-container">
      <span className="main-text-large" style={{ marginBottom: 20 }}>
        Information
      </span>
      <div className="form-group-wrapper">
        <div className="input-wrapper">
          <span className="du-form-label">Start date</span>
          <input
            type="date"
            onChange={(e) =>
              setFormData({ ...formData, start_at: e.target.value })
            }
            name="start_at"
            value={editStatus ? formData.start_at : employee.start_at}
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
                ? store.getTeamNameByTeamId(formData.team)
                : employee.team
            }
            className="p-pd-b-iu-input-general"
            onChange={(e) => setFormData({ ...formData, team: e.target.value })}
            disabled={!isEditing}
          >
            {team?.map((item) => (
              <option value={item.team_id}>{item.team_name}</option>
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
            value={editStatus ? formData.address : employee.address}
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
            value={
              editStatus ? formData.monthly_salary : employee.monthly_salary
            }
            onChange={(e) =>
              setFormData({ ...formData, monthly_salary: e.target.value })
            }
            className="p-pd-b-iu-input-general"
            placeholder={"Salary per hour"}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="btn-submit-form-wrapper">
        {editStatus && (
          <button className="btn-submit-form" onClick={handleSubmitForm}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default InfoPanel;
