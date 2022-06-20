import "../Panel.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, Fragment } from "react";
import { useSnapshot } from "valtio";
import store from "store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "components/Modal/Modal";
import { faPlusSquare, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function WorkingPanel(props) {
  let { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { workings } = useSnapshot(store);
  const [working, setWorking] = useState([]);
  const [submitFormData, setSubmitFormData] = useState({
    date: "",
    hour: 0,
  });
  useEffect(() => {
    setWorking(workings.filter((item) => item.employee_id === id));
  }, [workings]);
  const removeItem = (id) => {
    store.removeWork(id);
  };
  const handleSubmitForm = () => {
    const data = {
      employee_id: id,
      date: submitFormData.date,
      hour: parseInt(submitFormData.hour),
    };
    console.log(data);
    store.addWorking(data);
    setShowModal(false);
  };
  const cellStyle = { fontSize: 14, fontFamily: "Poppins, san-serif" };
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "no", cellStyle: cellStyle },
    { field: "date", cellStyle: cellStyle },
    { field: "hour", cellStyle: cellStyle },
    {
      field: "option",
      cellRenderer: function (params) {
        return (
          <FontAwesomeIcon
            icon={faTrashAlt}
            style={{ fontSize: 16, cursor: "pointer" }}
            onClick={() => removeItem(params.data.id)}
          />
        );
      },
      cellStyle: cellStyle,
    },
  ]);
  useEffect(() => {
    const data = working.map((item, index) => {
      return {
        id: item.work_id,
        no: index,
        date: item.date,
        hour: item.hour,
      };
    });
    setRowData(data);
  }, [working]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
    }),
    []
  );
  return (
    <Fragment>
      <div className="panel-container" style={{ gap: 10 }}>
        <span className="main-text-large" style={{ marginBottom: 20 }}>
          <FontAwesomeIcon
            className="table-tool-icon"
            style={{ fontSize: 26, marginRight: 20 }}
            icon={faPlusSquare}
            onClick={() => setShowModal(true)}
          />
          Working
        </span>

        <div className="ag-theme-alpine table-wrapper" style={{ height: 380 }}>
          <AgGridReact
            className="ag-theme-alpine"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={rowData}
          />
        </div>
      </div>

      <Modal
        openModal={showModal}
        title={"Add a working detal"}
        width={30}
        height={200}
        transparent={"0.2"}
        closeModal={() => {
          setShowModal(false);
        }}
      >
        <div className="input-wrapper">
          <span className="du-form-label">Work date:</span>
          <input
            type="text"
            name="date"
            value={submitFormData.date}
            onChange={(e) =>
              setSubmitFormData({ ...submitFormData, date: e.target.value })
            }
            className="p-pd-b-iu-input-general"
          />
        </div>
        <div className="input-wrapper">
          <span className="du-form-label">Hour:</span>
          <input
            type="text"
            name="hour"
            value={submitFormData.hour}
            onChange={(e) =>
              setSubmitFormData({ ...submitFormData, hour: e.target.value })
            }
            className="p-pd-b-iu-input-general"
          />
        </div>
        <div className="btn-submit-form-wrapper">
          <button className="btn-submit-form" onClick={handleSubmitForm}>
            Add
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default WorkingPanel;
