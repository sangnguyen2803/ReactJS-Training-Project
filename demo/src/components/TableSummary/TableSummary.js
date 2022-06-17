import {
  faPlusSquare,
  faSearch,
  faTrashAlt,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TableSummary.scss";
import store from "store";
function TableSummary({ searchTerm, setSearchTerm, ...rest }) {
  const { isCheck } = rest;
  const handleDeleteCheckAll = () => {
    store.employeeMultipleDeletion(isCheck);
  };
  return (
    <div className="table-summary-container">
      <div className="table-summary-header">
        <div className="table-summary-title">{rest.title}</div>
        <div className="table-tool-wrapper">
          <FontAwesomeIcon
            className="table-tool-icon"
            icon={faPlusSquare}
            onClick={() => rest.setSelectedEmployee(0)}
          />
          <FontAwesomeIcon
            className="table-tool-icon"
            onClick={handleDeleteCheckAll}
            icon={faTrashAlt}
          />
        </div>
      </div>
      <div className="search-wrapper">
        <span>
          Total <b>{rest.totalCount}</b> employees
        </span>
        <div className="search-input-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Search employee by name"
            value={searchTerm}
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
          />
          <FontAwesomeIcon className="inner-input-icon" icon={faSearch} />
        </div>
      </div>
    </div>
  );
}

export default TableSummary;
