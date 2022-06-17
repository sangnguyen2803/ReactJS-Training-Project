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

function AdvancesPanel(props) {
  let { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { advances } = useSnapshot(store);
  const [advance, setAdvance] = useState([]);
  const [submitFormData, setSubmitFormData] = useState({
    date: "",
    money: "0.00",
  });
  useEffect(() => {
    setAdvance(advances.filter((item) => item.employee_id === id));
  }, [advances]);

  const removeItem = (id) => {
    store.advancesWork(id);
  };
  const handleSubmitForm = () => {
    const data = {
      employee_id: id,
      date: submitFormData.date,
      money: submitFormData.money,
    };
    store.addAdvance(data);
    setShowModal(false);
  };
  const cellStyle = { fontSize: 14, fontFamily: "Poppins, san-serif" };
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "no", cellStyle: cellStyle },
    { field: "date", cellStyle: cellStyle },
    { field: "money", cellStyle: cellStyle },
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
    const data = advance.map((item, index) => {
      return {
        id: item.advance_id,
        no: index,
        date: item.date,
        money: parseInt(item.money),
      };
    });
    setRowData(data);
  }, [advance]);

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
          Advances
        </span>

        <div className="ag-theme-alpine table-wrapper" style={{ height: 220 }}>
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
        title={"Add an advance"}
        width={30}
        height={200}
        transparent={"0.2"}
        closeModal={() => {
          setShowModal(false);
        }}
      >
        <div className="input-wrapper">
          <span className="du-form-label">Date:</span>
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
          <span className="du-form-label">Money:</span>
          <input
            type="text"
            name="hour"
            value={submitFormData.money}
            onChange={(e) =>
              setSubmitFormData({ ...submitFormData, money: e.target.value })
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

export default AdvancesPanel;
