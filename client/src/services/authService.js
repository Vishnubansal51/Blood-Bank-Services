import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      alert("please prvoide all fields");
    }
    store.dispatch(userLogin({ role, email, password }));
  } catch (error) {
    console.log("error");
  }
};
export const handleRegister = (
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
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister(
        {
        role,
        email,
        website,
        name,
        address,
        phone,
        password,
        organisationName,
        hospitalName}
      )
    ); 
  } catch (error) {
    console.log("error");
  }
};
