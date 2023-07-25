import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const OrgList = () => {
  const [data, setData] = useState([]);

  // find doanr records
  const get_org = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
    //   console.log(data);
      if(data?.success)
      {
        setData(data?.org_data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_org();
  }, []);

  //delete function
  const handle_hospital_delete =  async (id) =>{
    try{
      let ask = window.prompt('Are you really Want to this data','YES')
      if(!ask) return 
      const {data} =  await  API.delete(`/admin/delete-hospital/${id}`)
      alert(data?.message);
      window.location.reload();
    }
    catch(error){
      console.log(error)


    }
  }

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Time & Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* map to extract data from data */}
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName }</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm:s A")}</td>
              <td>
                <button className="btn btn-danger  " onClick={() => handle_hospital_delete(record._id)}> DELETE</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default OrgList;
