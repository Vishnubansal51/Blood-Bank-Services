import React, { useState } from "react";
import InputType from './../Form/InputType';
import API from './../../../services/API';
import {useSelector} from "react-redux";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [email, setEmail] = useState("");
  const {user} = useSelector(state => state.auth)
  
  // handle modal data

  const handleModalSubmit = async ()=>{
    try{
      if(!bloodGroup || !quantity)
      {
        return alert('Please Provide all fields')
      }
      const {data} = await API.post('/inventory/create-inventory',{
  
      organisation:user?._id,
      email,
      inventoryType,
      quantity,
      bloodGroup

    })
    if(data?.success)
    {
      alert('New record created')
      window.location.reload()
    }
  }
  catch(error){
    alert(error.response.data.message);
    console.log(error);
    window.location.reload()
    
    }
  }

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3">
                Blood Type:
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="same"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="in">
                    In
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="same"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="out">
                    Out
                  </label>
                </div>
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue={'Open this select menu'}>Open this select menu</option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
              </select>
              <InputType
              labelText={'Donar Email'}
              inputType={'email'}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
              <InputType
              labelText={'Quantity (ml)'}
              inputType={'number'}
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"
              onClick={handleModalSubmit} 
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
