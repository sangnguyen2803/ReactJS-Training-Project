import { Routes, Route, BrowserRouter } from "react-router-dom";
import Employees from "./screens/Employees";
import EmployeeDetails from "./screens/EmployeeDetails";
import Team from "./screens/Team";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import InfoPanel from "components/Panel/InfoPanel/InfoPanel";
import WorkingPanel from "components/Panel/WorkingPanel/WorkingPanel";
import AdvancesPanel from "components/Panel/AdvancesPanel/AdvancesPanel";
import StatisticsPanel from "components/Panel/StatisticsPanel/StatisticsPanel";

function App(props) {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="employees" element={<Employees />} />
        <Route path="employee-detail/:id" element={<EmployeeDetails />}>
          <Route path="info" element={<InfoPanel />} />
          <Route path="working" element={<WorkingPanel />} />
          <Route path="advances" element={<AdvancesPanel />} />
          <Route path="statistics" element={<StatisticsPanel />} />
        </Route>
        <Route path="team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
