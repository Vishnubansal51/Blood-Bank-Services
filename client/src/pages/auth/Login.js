import React from "react";
// import InputType from './../../components/shared/Form/InputType';
import Form from './../../components/shared/Form/Form';

const Login = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner ">
          <img src="./assets/images/login_image.jpg" alt="login img" />
        </div>
        <div className="col-md-4 form-container">
          {/* <form> */}
            {/* <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div> */}
            {/* // 2 */}
            {/* <InputType labelText={'EMail'} labelFor={'forEmail'} inputType={'email'} name={'email'} />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form> */}
            <Form
            formTitle={"Login Page"}
            submitBtn={"Login"}
            formType={'login'}
            />
        </div>
      </div>
    </>
  );
};

export default Login;
