import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { useNavigate } from "react-router-dom";
import store from "store";
import "./Table.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Table(props) {
  return (
    <Fragment>
      <table className="table-wrapper">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            {props.headerData &&
              props.headerData.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(10)
            .fill()
            .map((data, index) => (
              <tr
                key={index}
                style={{ lineHeight: 2, height: 5, userSelect: "none" }}
              >
                <td style={{ width: "10%" }}></td>
                <td style={{ width: "5%" }}>
                  <Skeleton width={150} />
                </td>
                <td style={{ width: "25%" }}>
                  {" "}
                  <Skeleton />
                </td>
                <td style={{ width: "25%" }}>
                  {" "}
                  <Skeleton />
                </td>
                <td style={{ width: "25%" }}>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Table;
