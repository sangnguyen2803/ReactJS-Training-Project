import axios from "axios";
import store from "store";

export const getEmployeeById = async (id) => {
  try {
    const endpoint = `https://employee-management-147.herokuapp.com/api/employee/find-by-id/${id}`;
    const res = await axios.get(endpoint);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getAllEmployees = async (id) => {
  try {
    const endpoint = `https://employee-management-147.herokuapp.com/api/employee/get-all`;
    const res = await axios.get(endpoint);
    store.setEmployees(res.data);
    await sleep(3000);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTeams = async (id) => {
  try {
    const endpoint = `https://employee-management-147.herokuapp.com/api/team/get-all`;
    const res = await axios.get(endpoint);
    store.setTeams(res.data);
    await sleep(2000);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addEmployee = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint =
      "https://employee-management-147.herokuapp.com/api/employee/create";
    const res = await axios.post(endpoint, body, config);
    console.log(res);
    await sleep(3000);
    return res;
  } catch (err) {}
};
