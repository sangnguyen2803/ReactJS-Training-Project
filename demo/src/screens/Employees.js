import { useState, useMemo, useEffect } from "react";
import { subscribe, useSnapshot } from "valtio";
import store from "store";
import Pagination from "components/Pagination/Pagination";
import Table from "components/Table/Table";
import TableSkeleton from "components/Table/TableSkeleton";
import TableSummary from "components/TableSummary/TableSummary";
import DataUpsertion from "components/DataUpsertion/DataUpsertion";
import { useQuery, useQueryClient } from "react-query";
import { getAllTeams, getAllEmployees } from "api";

import "./Employees.scss";

const table_header = ["No", "Full Name", "Phone", "Team", "Option"];
let PageSize = 10;
function Employees(props) {
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  //fetching api
  const emp = useQuery("user", () => getAllEmployees());
  const tea = useQuery("team", () => getAllTeams());
  const { employees } = useSnapshot(store);
  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);
  //table data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setCurrentData] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      setCurrentData(
        employeeData
          .filter((item) =>
            item.fullName.toUpperCase().includes(searchTerm.toUpperCase())
          )
          .slice(firstPageIndex, lastPageIndex)
      );
    } else {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      setCurrentData(employeeData?.slice(firstPageIndex, lastPageIndex));
    }
  }, [currentPage, searchTerm, employeeData]);

  const handleEmployeeDeletion = (id) => {
    store.removeEmployee(id);
  };
  return (
    <div className="screen-layout-container">
      <div className="screen-layout-main-wrapper" style={{ marginTop: 50 }}>
        <TableSummary
          isLoading={emp.isLoading}
          isCheck={isCheck}
          title={"Employee"}
          totalCount={employeeData?.length || 0}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedEmployee={setSelectedEmployee}
        />
        {emp.isLoading ? (
          <TableSkeleton headerData={table_header} />
        ) : (
          <Table
            isCheck={isCheck}
            setIsCheck={setIsCheck}
            handleEmployeeDeletion={handleEmployeeDeletion}
            headerData={table_header}
            tableData={currentData}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            setSelectedEmployeeData={setSelectedEmployeeData}
          />
        )}

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={employeeData?.length || 0}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="screen-layout-panel-wrapper">
        <DataUpsertion
          selectedEmployee={selectedEmployee}
          selectedEmployeeData={selectedEmployeeData}
          data={selectedEmployeeData}
        />
      </div>
    </div>
  );
}

export default Employees;
