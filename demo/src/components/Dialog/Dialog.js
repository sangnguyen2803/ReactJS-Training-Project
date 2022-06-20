import { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import "./Dialog.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/fontawesome-free-solid";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Dialog = ({ visibility, close, ...rest }) => {
  const dialogStyling = {
    width: rest.width || "400px",
    height: rest.height || "200px",
  };
  return ReactDOM.createPortal(
    visibility ? (
      <Fragment>
        <div className="darken-transparent-background" onClick={close}>
          <div
            className="dialog-wrapper"
            onClick={(e) => e.stopPropagation()}
            style={dialogStyling}
          >
            <div className="header-row">
              <div className="header-title">
                {rest.dialogContent.header || "Error"}
              </div>
              <FontAwesomeIcon
                className="header-close-icon"
                icon={faTimes}
                onClick={close}
              />
            </div>

            <div className="dialog-detail-wrapper">
              <div className="dialogbox-content">
                <div className="dialog-icon">
                  {rest.dialogContent.status === 1 ? (
                    <FontAwesomeIcon
                      style={{ fontSize: 32, color: "#387c44" }}
                      icon={faCheckCircle}
                    />
                  ) : rest.dialogContent.status === 2 ? (
                    <FontAwesomeIcon
                      style={{ fontSize: 32, color: "#38ACEC" }}
                      icon={faEllipsis}
                    />
                  ) : (
                    <FontAwesomeIcon
                      style={{ fontSize: 32, color: "#990000" }}
                      icon={faExclamationCircle}
                    />
                  )}
                </div>
                <span className="dialogbox-content-detail-main">
                  {rest.dialogContent.text1} :{" "}
                  {rest.dialogContent.status === 1 ? (
                    <span style={{ color: "#387c44" }}>Success</span>
                  ) : rest.dialogContent.status === 2 ? (
                    <span style={{ color: "#38ACEC" }}>In Progress</span>
                  ) : (
                    <span style={{ color: "#990000" }}>Failure</span>
                  )}
                </span>
                <span className="dialogbox-content-detail-sub">
                  {rest.dialogContent.text2}
                </span>
              </div>
              <div className="dialogbox-action">
                <div className="btn-submit-form">OK</div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment></Fragment>
    ),
    document.getElementById("portal-root")
  );
};
export default Dialog;
