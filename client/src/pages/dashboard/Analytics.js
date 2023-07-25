import React, { useEffect, useState } from "react";

import Header from "./../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#461959",
    "#982176",
    "#071952",
    "#1B6B93",
    "#071952",
    "#1B6B93",
    "#982176",
    "#461959",
 
  ];
  // get blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroupData");
      if (data?.success) {
        setData(data?.curr_blood_group_data);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //liferecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // to call blood records using useeffects
  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap justify-content-center ">
        {data?.map((record, i) => (
          <div
            className="card m-3  p-2"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
          >
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body ">
              <h1 className="card-title bg-light text-dark text-center mb-3">
                {record.SingleBloodGroup}
              </h1>
              <p className="card-text text-light">
                Total In: <b>{record.BloodIn}</b>(ml)
              </p>
              <p className="card-text text-light">
                Total Out: <b>{record.BloodOut}</b>(ml)
              </p>
              {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
            </div>
            <div className="card-footer bg-dark text-light text-center">
              Total Avialable: <b>{record.BloodLeft}</b>(ml)
            </div>
          </div>
        ))}
      </div>

      <div className="container  mt-3">
        <h1 className="my-3 mx-4">Recent Blood Entries</h1>
        <table className="table mx-4">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Quantity</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {/* map to extract data from data */}
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.email}</td>
                <td>{record.quantity}(ml)</td>
                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm:s A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
