import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";

const Consumer = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  // find consumer records
  const getConsumer = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hsp", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      //   console.log(data);
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConsumer();
  }, []);

  return (
    <Layout>
      <div className="contianer mt-5 mx-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventry Type</th>
              <th scope="col">Qunatity</th>
              <th scope="col">Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {/* map to extract data from data */}
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>

                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm:s A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Consumer;
