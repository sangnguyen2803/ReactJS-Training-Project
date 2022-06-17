import "../Panel.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { useSnapshot } from "valtio";
import store from "store";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Chart from "react-apexcharts";

function StatisticsPanel(props) {
  const [totalAdvance, setTotalAdvance] = useState(0);
  const [totalWorkingDay, setTotalWorkingDay] = useState(0);
  const [options, setOptions] = useState({
    chart: {
      id: "chart",
    },
    title: {
      text: "Monly salary in year 2022",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        color: "#263238",
      },
    },
    xaxis: {
      style: {
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        color: "#263238",
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  let { id } = useParams();
  useEffect(() => {
    const totalWorkingDay = store.getTotalWorkingDays(id);
    setTotalWorkingDay(totalWorkingDay);
    const totalAdvance = store.getTotalAdvance(id);
    setTotalAdvance(totalAdvance);
    const result = store.getSalaryByYear(id, 2022);
    setSeries([
      {
        name: "series-1",
        data: result,
      },
    ]);
  }, []);

  return (
    <Fragment>
      <div className="panel-container" style={{ gap: 10 }}>
        <span className="main-text-large" style={{ marginBottom: 0 }}>
          Statistics
        </span>
        <span className="sub-text-small">
          Total working days: <b> {totalWorkingDay} Day(s)</b>
        </span>
        <span className="sub-text-small">
          Total advance: <b>$ {totalAdvance.toFixed(2)}</b>
        </span>
        <span>
          <div className="chart-container">
            <Chart
              options={options}
              series={series}
              type="bar"
              width={1100}
              height={350}
            />
          </div>
        </span>
      </div>
    </Fragment>
  );
}

export default StatisticsPanel;
