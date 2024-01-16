import React, { useEffect, useState } from "react";
import "../style/admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loadingImage from "../assets/loader.gif";

//Toast Functions
const notifyA = (msg) => {
  toast.error(msg);
};
const notifysuccess = (msg) => {
  toast.success(msg);
};

function Admin() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };
  const [array, setArray] = useState([]);
  useEffect(() => {
    const apiUrl = "http://localhost:5000/survey-data";
    axios
      .get(apiUrl)
      .then((Response) => {
        if (Response.data.error) {
          notifyA(Response.data.error);
        } else {
          setArray(Response.data);
          notifysuccess("form is submitted successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="admincontainer">
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        logout
      </button>
      <div className="box">
        <div className="list">
          {array.map((user, index) => (
            <div className="data" key={index}>
              <p> {user.name}</p>
              <p> {user.gender}</p>
              <p> {user.nationality}</p>
              <p> {user.phone}</p>
              <p> {user.address}</p>
              <p> {user.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
