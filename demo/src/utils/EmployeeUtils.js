export const removeEmployee = (employees, id) => {
  return employees.filter((employee) => employee.id !== id);
};
export const removeWork = (workings, id) => {
  return workings.filter((work) => work.work_id !== id);
};
export const removeAdvance = (advances, id) => {
  return advances.filter((advance) => advance.advance_id !== id);
};
export const addEmployee = (employees, id, employee) => {
  employee.id = String(id);
  return employees.concat(employee);
};

export const addWorking = (workings, id, work) => {
  work.work_id = String(id);
  return workings.concat(work);
};
export const addAdvance = (advances, id, advance) => {
  advance.advance_id = String(id);
  return advances.concat(advance);
};
export const addTeam = (teams, id, team) => {
  team.team_id = String(id);
  return teams.concat(team);
};
