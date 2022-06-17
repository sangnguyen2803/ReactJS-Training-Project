import { proxy } from "valtio";
import { devtools } from "valtio/utils";
import { v4 as uuidv4, v4 } from "uuid";
import {
  removeEmployee,
  addEmployee,
  removeWork,
  addAdvance,
  removeAdvance,
  addWorking,
  addTeam,
} from "utils/EmployeeUtils";
import employee_data from "json/employee_data";
import working_data from "json/working_data";
import advance_data from "json/advance_data";
import team_data from "json/team_data";

const MONTHLY_WORKING_DAY = 20;
const store = proxy({
  employees: employee_data,
  workings: working_data,
  advances: advance_data,
  teams: team_data,
  isEditing: false,

  getTeamNameByTeamId: (team_id) => {
    return store.teams.filter((item) => item.team_id === team_id)[0].team_name;
  },
  getEmployeesByTeam: (team_id) => {
    let team_member = [];
    store.employees.map((item) => {
      if (item.team === team_id) {
        team_member.push(item);
      }
    });
    return team_member;
  },
  getTotalAdvance: (id) => {
    return store.advances.reduce(function (sum, record) {
      if (record.employee_id === id) return sum + record.money;
      else return sum;
    }, 0);
  },
  getTotalWorkingDays: (id) => {
    let count = 0;
    store.workings.map((work) => {
      if (work.employee_id === id) count += 1;
    });
    return count;
  },
  getTotalWorkingDaysByMonth: (id, month) => {
    console.log(id, month);
    let count = 0;
    store.workings.map((work) => {
      if (work.employee_id === id && new Date(work.date).getMonth() === month) {
        count += 1;
      }
    });
    return count;
  },
  getSalaryByYear: (id, year) => {
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let filterList = store.advances.filter(
      (advance) => advance.employee_id === id
    );
    let res = store.employees.filter((item) => item.id === id)[0];
    filterList.map(function (item) {
      arr[new Date(item.date).getMonth()] = parseInt(
        (parseInt(res.monthly_salary) / MONTHLY_WORKING_DAY) *
          store.getTotalWorkingDaysByMonth(id, new Date(item.date).getMonth())
      );
    });
    console.log(filterList);
    filterList.map(function (record) {
      console.log(record);
      const date = new Date(record.date);
      if (year === date.getFullYear()) {
        arr[date.getMonth()] -= record.money;
      }
    });
    console.log(arr);
    return arr;
  },
  addTeam: (team) => {
    const result = addTeam(store.teams, uuidv4(), team);
    store.teams = result;
  },
  employeeMultipleDeletion: (arr) => {
    let copy = store.employees;
    for (let i = 0; i < arr.length; i++) {
      let removePosition = copy.findIndex((element) => element.id === arr[i]);
      if (removePosition !== -1) store.employees.splice(removePosition, 1);
    }
    console.log(store.employees);
  },
  addEmployee: (employee) => {
    const result = addEmployee(store.employees, uuidv4(), employee);
    store.employees = result;
  },
  addWorking: (work) => {
    const result = addWorking(store.workings, uuidv4(), work);
    store.workings = result;
  },
  addAdvance: (advance) => {
    const result = addAdvance(store.advances, uuidv4(), advance);
    store.advances = result;
  },
  updateEditStatus: () => {
    store.isEditing = !store.isEditing;
  },
  removeEmployee: (id) => {
    store.employees = removeEmployee(store.employees, id);
  },
  removeWork: (id) => {
    store.workings = removeWork(store.workings, id);
  },
  removeAdvance: (id) => {
    store.workings = removeAdvance(store.advances, id);
  },
});

devtools(store, "employees");

export default store;
