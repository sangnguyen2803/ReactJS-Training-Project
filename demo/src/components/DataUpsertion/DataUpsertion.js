import { useSnapshot } from "valtio";
import { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/fontawesome-free-solid";
import store from "store";
import "./DataUpsertion.scss";

function DataUpsertion({ selectedEmployee, ...rest }) {
  const [team, setTeam] = useState();
  const { teams } = useSnapshot(store);
  useEffect(() => {
    setTeam(teams);
  }, [teams]);
  const initialValues = {
    full_name: "",
    phone: "",
    team: "1",
    address: "",
    gender: "0",
    monthly_salary: "",
    start_at: "",
    age: 18,
    profile_image: "",
  };
  const handleSubmitForm = (data) => {
    console.log(data);
    store.addEmployee(data);
  };
  return (
    <Fragment>
      <div className="du-title">Add an employee</div>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={(values) => handleSubmitForm(values)}
      >
        {(formikProps) => {
          const { values, errors, touched } = formikProps;
          return (
            <Fragment>
              <Form className="du-form-data-container">
                <span className="du-form-label">Gender</span>
                <div className="du-input-radio-group">
                  <label>
                    <Field type="radio" name="gender" value="0" />
                    Male
                    <FontAwesomeIcon className="mars-icon" icon={faMars} />
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="1" />
                    Female
                    <FontAwesomeIcon className="venus-icon" icon={faVenus} />
                  </label>
                </div>
                <span className="du-form-label">Full name</span>
                <Field
                  type="text"
                  name="full_name"
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
                  name="monthly_salary"
                  className="p-pd-b-iu-input-general"
                  placeholder={"Enter your salary per month"}
                />
                <span className="du-form-label">Start date</span>
                <Field
                  type="date"
                  name="start_at"
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
                  name="team"
                  className="p-pd-b-iu-input-general"
                >
                  {team?.map((item, index) => (
                    <option key={index} value={item.team_id}>
                      {item.team_name}
                    </option>
                  ))}
                </Field>
                <div className="btn-submit-form-wrapper">
                  <button className="btn-submit-form" type="submit">
                    Add
                  </button>
                </div>
              </Form>
            </Fragment>
          );
        }}
      </Formik>
    </Fragment>
  );
}

export default DataUpsertion;
