import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Modal from "components/Modal/Modal";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState, useMemo, Fragment } from "react";
import {
  faBook,
  faInfoCircle,
  faPlusSquare,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from "store";
import { useSnapshot } from "valtio";

function Team(props) {
  let navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [team, setTeam] = useState();
  const { teams } = useSnapshot(store);
  useEffect(() => {
    setTeam(teams);
  }, [teams]);
  const cellStyle = { fontSize: 14, fontFamily: "Poppins, san-serif" };
  const [rowData1, setRowData1] = useState([]);
  const [rowData2, setRowData2] = useState([]);
  useEffect(() => {
    const data = team?.map((item, index) => {
      return {
        team_id: item.team_id,
        no: index,
        team_name: item.team_name,
      };
    });
    setRowData1(data);
  }, [team]);
  const [columnDefs1] = useState([
    { field: "no", cellStyle: cellStyle },
    { field: "team_name", cellStyle: cellStyle },
    {
      field: "detail",
      cellRenderer: function (params) {
        return (
          <FontAwesomeIcon
            icon={faBook}
            style={{ fontSize: 16, cursor: "pointer" }}
            onClick={() => {
              const result = store.getEmployeesByTeam(params.data.team_id);
              let data = [];
              result?.map((item, index) => {
                data.push({
                  id: item.id,
                  no: index,
                  full_name: item.full_name,
                  phone: item.phone,
                  address: item.address,
                  gender: item.gender,
                });
              });
              setRowData2(data);
            }}
          />
        );
      },
      cellStyle: cellStyle,
    },
  ]);
  const [columnDefs2] = useState([
    { field: "no", cellStyle: cellStyle },
    { field: "full_name", cellStyle: cellStyle },
    {
      field: "phone",
      cellStyle: cellStyle,
    },
    {
      field: "address",
      cellStyle: cellStyle,
    },
    {
      field: "gender",
      cellStyle: cellStyle,
    },
    {
      field: "option",
      cellRenderer: function (params) {
        return (
          <FontAwesomeIcon
            icon={faInfoCircle}
            onClick={() => navigate(`/employee-detail/${params.data.id}/info`)}
            style={{ fontSize: 16, cursor: "pointer" }}
          />
        );
      },
      cellStyle: cellStyle,
    },
  ]);
  const defaultColDef1 = useMemo(
    () => ({
      flex: 1,
    }),
    []
  );
  const defaultColDef2 = useMemo(
    () => ({
      flex: 1,
    }),
    []
  );
  const handleSubmitForm = () => {
    const data = {
      team_name: teamName,
    };
    store.addTeam(data);
    setShowModal(false);
  };
  return (
    <div className="full-screen-layout-container">
      <div className="full-screen-main-layout" style={{ marginTop: 50 }}>
        <span className="main-text-large" style={{ marginBottom: 20 }}>
          <FontAwesomeIcon
            className="table-tool-icon"
            style={{ fontSize: 26, marginRight: 20, cursor: "pointer" }}
            icon={faPlusSquare}
            onClick={() => setShowModal(true)}
          />
          Team
        </span>

        <span className="sub-text-medium" style={{ margin: "10px 0" }}>
          Total {rowData1?.length || 0} team(s)
        </span>
        <div className="ag-theme-alpine table-wrapper" style={{ height: 200 }}>
          <AgGridReact
            className="ag-theme-alpine"
            columnDefs={columnDefs1}
            defaultColDef={defaultColDef1}
            rowData={rowData1}
          />
        </div>
        <span className="sub-text-medium" style={{ margin: "10px 0" }}>
          Result of all employees of selected team - Total{" "}
          {rowData2?.length || 0} employee(s)
        </span>
        <div className="ag-theme-alpine table-wrapper" style={{ height: 450 }}>
          <AgGridReact
            className="ag-theme-alpine"
            columnDefs={columnDefs2}
            defaultColDef={defaultColDef2}
            rowData={rowData2}
          />
        </div>
      </div>
      <Modal
        openModal={showModal}
        title={"Add a working detal"}
        width={50}
        height={200}
        transparent={"0.2"}
        closeModal={() => {
          setShowModal(false);
        }}
      >
        <div className="input-wrapper">
          <span className="du-form-label">Team name:</span>
          <input
            style={{ margin: "10px 0" }}
            placeholder={"Enter team name"}
            type="text"
            name="hour"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="p-pd-b-iu-input-general"
          />
        </div>
        <div className="btn-submit-form-wrapper">
          <button className="btn-submit-form" onClick={handleSubmitForm}>
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Team;
