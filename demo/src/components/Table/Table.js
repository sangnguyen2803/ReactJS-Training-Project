import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { useNavigate } from "react-router-dom";
import store from "store";
import "./Table.scss";

function Table({ tableData, ...rest }) {
  const { isCheck, setIsCheck } = rest;
  let navigate = useNavigate();
  const [isCheckAll, setIsCheckAll] = useState(false);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(tableData.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <Fragment>
      <table className="table-wrapper">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e)}
                defaultChecked={isCheckAll}
              />
            </th>
            {rest.headerData &&
              rest.headerData.map((head, index) => <th key={index}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((data, index) => (
              <tr
                key={index}
                style={{ lineHeight: 2, height: 5, userSelect: "none" }}
                onClick={(e) => {
                  e.stopPropagation();
                  rest.setSelectedEmployee(data.id);
                  rest.setSelectedEmployeeData(data);
                }}
              >
                <td style={{ width: "10%" }}>
                  <input
                    style={{ cursor: "pointer" }}
                    name="employee"
                    id={data.id}
                    onChange={(e) => handleClick(e)}
                    checked={isCheck.includes(data.id)}
                    type="checkbox"
                  />
                </td>
                <td style={{ width: "5%" }}>{data.id}</td>
                <td style={{ width: "25%" }}>{data.full_name}</td>
                <td style={{ width: "25%" }}>{data.phone}</td>
                <td style={{ width: "25%" }}>
                  {store.getTeamNameByTeamId(data.team)}
                </td>
                <td>
                  <FontAwesomeIcon
                    className="table-icon"
                    style={{ marginRight: 20 }}
                    icon={faInfoCircle}
                    onClick={() => navigate(`/employee-detail/${data.id}/info`)}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      rest.handleEmployeeDeletion(data.id);
                      if (isCheck.includes(data.id)) {
                        setIsCheck(isCheck.filter((item) => item !== data.id));
                      }
                    }}
                    className="table-icon"
                    icon={faTrashAlt}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Table;
