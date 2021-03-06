import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { useParams, useNavigate } from "react-router-dom";
import store from "store";
import ProfileDetail from "components/ProfileDetail/ProfileDetail";
import "./EmployeeDetail.scss";
import {
  faEdit,
  faUndo,
  faTrashAlt,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "react-query"; 

function EmployeeDetails(props) {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const { isFetching, isLoading, error, data } = useQuery("repoData", () =>
    fetch(
      `https://employee-management-147.herokuapp.com/api/employee/find-by-id/${id}`
    ).then((res) => res.json())
  );
  const { employees, workings, advances, isEditing } = useSnapshot(store);
  let navigate = useNavigate();
  const [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    setEditStatus(isEditing);
  }, [isEditing]);

  const [employee, setEmployee] = useState({});
  useEffect(() => {
    setEmployee(employees.filter((item) => item.id === id)[0]);
  }, []);

  
  return (
    <div className="full-screen-layout-container">
      <div className="full-screen-main-layout" style={{ marginTop: 50 }}>
        <div className="table-summary-header">
          <div className="table-summary-title">{data?.fullName}</div>
          <div className="table-tool-wrapper">
            <FontAwesomeIcon
              className="table-tool-icon"
              onClick={() => {
                setEditStatus((prev) => !prev);
                store.updateEditStatus();
              }}
              icon={!editStatus ? faEdit : faUndo}
            />
            <FontAwesomeIcon
              className="table-tool-icon"
              onClick={() => {
                store.removeEmployee(employee.id);
                navigate("/employees");
              }}
              icon={faTrashAlt}
            />
          </div>
        </div>
        <ProfileDetail data={data} />
      </div>
    </div>
  );
}

export default EmployeeDetails;
