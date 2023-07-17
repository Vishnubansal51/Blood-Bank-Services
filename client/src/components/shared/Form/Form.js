import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    // e for event
    <div
      onSubmit={(e) => {
        if (formType === "login") return handleLogin(e, role, email, password);
        else if (formType === "register")
          return handleRegister(
            e,
            role,
            email,
            website,
            name,
            address,
            phone,
            password,
            organisationName,
            hospitalName
          );
      }}
    >
      <form>
        <h1 className="text-center"> {formTitle}</h1> <hr />
        <div className="d-flex mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label class="form-check-label" htmlFor="donarRadio">
              Donar
            </label>
          </div>
          <div class="form-check ms-2">
            <input
              class="form-check-input"
              type="radio"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label class="form-check-label" htmlFor="adminRadio">
              Admin
            </label>
          </div>
          <div class="form-check ms-2">
            <input
              class="form-check-input"
              type="radio"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label class="form-check-label" htmlFor="hospitalRadio">
              Hospital
            </label>
          </div>
          <div class="form-check ms-2">
            <input
              class="form-check-input"
              type="radio"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label class="form-check-label" htmlFor="organisationRadio">
              Organisation
            </label>
          </div>
        </div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"EMAIL"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelFor={"forPassword"}
                    labelText={"Password"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelFor={"forName"}
                      labelText={"Name"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelFor={"fororganisationName"}
                      labelText={"Organisation Name"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelFor={"forHospitalName"}
                      labelText={"Hospital Name"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={"EMAIL"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <InputType
                    labelFor={"forWebsite"}
                    labelText={"Website"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelFor={"forAddress"}
                    labelText={"Address"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelFor={"forPhone"}
                    labelText={"Phone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <InputType
                    labelFor={"forPassword"}
                    labelText={"Password"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}
        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            // using turnery operator
            <p>
              {" "}
              Not Registerd Yet ? Register
              <Link to="/register "> Here!</Link>
            </p>
          ) : (
            <p>
              {" "}
              You are Already User
              <Link to="/login  "> Login!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
