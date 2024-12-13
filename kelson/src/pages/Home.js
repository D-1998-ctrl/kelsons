

import React, { useState, useEffect } from "react";
import "./home.css";
import user from '../imgs/user.jpg';
import img1 from '../imgs/img1.png';

function Home() {
  const [machineNo, setMachineNo] = useState("");
  const [customer, setCustomer] = useState("");
  const [supplyDate, setSupplyDate] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [Colvalue, setColvalue] = useState(1)
  const homedetails = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "9a8b7c6d5e4f3g2h1i0j");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://weaveitapp.microtechsolutions.co.in/api/kelsons/getbyid.php?Table=tblCompanyInfo&Colname=CompanyId&Colvalue=${Colvalue}`, requestOptions)

      .then((response) => response.json())
      .then((result) => {
        // console.log("homedetails Data:", result);
        if (result && result.length > 0) {
          const data = result[0];
          setCustomer(data.CompanyName);
          setMachineNo(data.MachineNo);
          setSupplyDate(new Date(data.SupplyDate.date).toLocaleDateString());
          setProfilePic(data.Profilepic);
        }
      })
      .catch((error) => console.error(error));

  };

  useEffect(() => {
    homedetails();
  }, []);

  return (
    <div>
      <div className="Home_container">
        <div className="background-image-container">
          <img className="background-image" src={img1} alt="Background" />
        </div>
      </div>

      <div className="profileUser-card">
        <img src={profilePic} alt="" className="profile-image" />
        <div className="profile-content">
          <div className="profile-details">
            <h2>Customer: {customer}</h2>
            <h3>Machine No: {machineNo}</h3>
            <h3>Supply Date: {supplyDate}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

