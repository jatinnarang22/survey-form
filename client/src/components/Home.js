import React, { useEffect, useState, useRef } from "react";
import "../style/Home.css";
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

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setloading] = useState(false);
  const decodedTokenRef = useRef(null);

  //timeout
  const timeout = () => {
    setTimeout(() => {
      localStorage.removeItem("Token");
      setloading(false);
      navigate("/login");
      localStorage.removeItem("Token");
    }, 1000);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("Token");
    if (!userToken) {
      navigate("/login");
    }
    decodedTokenRef.current = JSON.parse(atob(userToken.split(".")[1]));
    console.log(decodedTokenRef.current);
  }, []);

  // const mail = "jatin";

  const navigate = useNavigate();

  // const mail = decodedTokenRef.current
  //   ? decodedTokenRef.current.email
  //   : "jatin1272@gmail.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData);
  };

  const handleSubmit = (e) => {
    // Add your logic for handling the form data (e.g., sending it to a server)
    console.log("Form submitted:", formData);

    if (
      !formData.address ||
      !formData.gender ||
      !formData.message ||
      !formData.name ||
      !formData.nationality ||
      !formData.phone
    ) {
      notifyA("Please fill all the fields");
      return;
    }

    const apiUrl = "http://localhost:5000/form";
    axios
      .post(apiUrl, formData)
      .then((Response) => {
        if (Response.data.error) {
          notifyA(Response.data.error);
        } else {
          notifysuccess("form is submitted successfully");
          setloading(true);
          timeout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      {loading ? (
        <div className="loader">
          <img src={loadingImage} alt="Loading..." />
        </div>
      ) : (
        <div className="box">
          <div className="form">
            <label>
              <p>Name:</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <br />

            <label>
              <p>Gender:</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <br />

            <label>
              <p>Nationality:</p>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              <p>Email:</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <br />

            <label>
              <p>Phone Number:</p>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              <p>Address:</p>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              <p>Message:</p>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </label>
            <br />

            <button
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
