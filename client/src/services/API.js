import axios from 'axios'
const API = axios.create ({baseURL: process.env.REACT_APP_BASEURL});

API.interceptors.request.use ((req)=>{
    if(localStorage.getItem('token'))
    {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
})

export default API;

// BY USING THIS API I CAN USE ALL THE CRUD OPERATION SEE THE MAGIN NOW