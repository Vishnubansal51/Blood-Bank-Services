import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      // store token
      if (data.success) {
         alert(data.message);
        localStorage.setItem("token", data.token);
        window.location.replace("/");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// for register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      role,
      email,
      website,
      name,
      address,
      phone,
      password,
      organisationName,
      hospitalName,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        role,
        email,
        website,
        name,
        address,
        phone,
        password,
        organisationName,
        hospitalName,
    });
    if(data.success)
    {
        alert("User Registerd Successfully");
        window.location.replace("/login");
        // toast.success("User Registerd Successfully");
    }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


// for current user
export const  getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async ({rejectWithValue }) =>{
    try{
      const  res = await API.get('/auth/current-user')
      if(res?.data){
        return res && res.data; // or simply right res?.data
      }
    }
    catch(error){
      console.log(error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }

    }
  }
)