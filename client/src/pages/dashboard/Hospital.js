import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Hospital = () => {
  const [data, setData] = useState([]);

  // find doanr records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      //   console.log(data);
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Address</th>
            <th scope="col">Time & Date</th>
          </tr>
        </thead>
        <tbody>
          {/* map to extract data from data */}
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.address}</td>
              <td>{record.phone}</td>

              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm:s A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Hospital;
