import { useSnapshot } from "valtio";
import { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/fontawesome-free-solid";
import { useMutation } from "react-query";
import { addEmployee } from "api";
import Dialog from "components/Dialog/Dialog";
import store from "store";
import "./DataUpsertion.scss";
function DataUpsertion({ selectedEmployee, ...rest }) {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    header: "Add an employee",
    text1: " Task progress",
    text2: "Adding a new employee is in progress... Please wait",
    status: 2,
  });

  const [team, setTeam] = useState();
  const { teams } = useSnapshot(store);
  const add = useMutation((values) => addEmployee(values), {
    onMutate: (variables) => {
      setShowDialog(true);
      setDialogContent({
        header: "Add an employee",
        text1: "Task progress:",
        text2: "Adding a new employee is in progress... Please wait",
        status: 2,
      });
    },
    onError: (error, variables, context) => {
      setDialogContent({
        header: "Add an employee",
        text1: "Task progress:",
        text2: "Fail to add a new employee to database. Try again",
        status: 3,
      });
    },
    onSuccess: () => {
      setDialogContent({
        header: "Add an employee",
        text1: "Task progress:",
        text2: "Successfully add a new employee",
        status: 1,
      });
    },
  });
  useEffect(() => {
    setTeam(teams);
  }, [teams]);
  const initialValues = {
    fullName: "",
    phone: "",
    teamID: 1,
    address: "",
    male: true,
    moneyPerHour: "",
    startDay: "",
    age: 18,
  };
  return (
    <Fragment>
      <div className="du-title">Add an employee</div>
      <Formik initialValues={initialValues} validateOnChange={false}>
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          return (
            <Fragment>
              <Form className="du-form-data-container">
                <span className="du-form-label">Gender</span>
                <div className="du-input-radio-group">
                  <label>
                    <Field type="radio" name="male" value={true} />
                    Male
                    <FontAwesomeIcon className="mars-icon" icon={faMars} />
                  </label>
                  <label>
                    <Field type="radio" name="male" value={false} />
                    Female
                    <FontAwesomeIcon className="venus-icon" icon={faVenus} />
                  </label>
                </div>
                <span className="du-form-label">Full name</span>
                <Field
                  type="text"
                  name="fullName"
                  className="p-pd-b-iu-input-general"
                  placeholder={"Enter your full name"}
                />
                <span className="du-form-label">Phone number</span>
                <Field
                  type="text"
                  name="phone"
                  className="p-pd-b-iu-input-general"
                  placeholder={"Enter your phone number"}
                />
                <span className="du-form-label">Address</span>
                <Field
                  type="text"
                  name="address"
                  className="p-pd-b-iu-input-general"
                  placeholder={"Enter your address"}
                />

                <span className="du-form-label">Monthly salary</span>
                <Field
                  type="text"
                  name="moneyPerHour"
                  className="p-pd-b-iu-input-general"
                  placeholder={"Enter your salary per month"}
                />
                <span className="du-form-label">Start date</span>
                <Field
                  type="date"
                  name="startDay"
                  className="p-pd-b-iu-input-general"
                  placeholder={"Enter your salary per month"}
                />
                <span className="du-form-label">Employee's age</span>
                <Field
                  type="number"
                  name="age"
                  className="p-pd-b-iu-input-general"
                  placeholder={"Enter your salary per month"}
                />
                <span className="du-form-label">Team</span>
                <Field
                  type="text"
                  as="select"
                  name="teamID"
                  className="p-pd-b-iu-input-general"
                >
                  {team?.map((item, index) => (
                    <option key={index} value={item.no}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                <div className="btn-submit-form-wrapper">
                  <div
                    className="btn-submit-form"
                    onClick={() => {
                      add.mutate(values);
                    }}
                  >
                    Add
                  </div>
                </div>
              </Form>
            </Fragment>
          );
        }}
      </Formik>
      <Dialog
        visibility={showDialog}
        dialogContent={dialogContent}
        close={() => setShowDialog(false)}
      ></Dialog>
    </Fragment>
  );
}

export default DataUpsertion;
