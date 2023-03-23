import React, {useState, useEffect} from "react";
import Navbar from "../NavigationBar/Navbar";
import * as api from "../Api/api";

function FindServices() {
  const [data, setData] = useState([])
  // retrieve data from flask
  useEffect(() => {
    fetch("/find-services").then(
      res => res.json()).then(
        data => {
          setData(data)
          console.log(data)
        })
  }, [])
  return (
    <div>
      <Navbar />
      <h1>Pet Sitting Services</h1>
      {data.map(service => (
        <div key={service['id']}>
          <p>
            <li>Username: {service['username']}</li>
            <li>Start Date: {service['startDate']}</li>
            <li>End Date: {service['endDate']}</li>
            <li>Price: {service['price']}</li>
            <li>Dog: {service['dog']?'Yes':'No'}</li>
            <li>Cat: {service['cat']?'Yes':'No'}</li>
            <li>Pet Boarding: {service['petBoarding']?'Yes':'No'}</li>
            <li>Dog Walking: {service['dogWalking']?'Yes':'No'}</li>
            <li>Pet Grooming: {service['petGrooming']?'Yes':'No'}</li>
            <li>Pet Daycare: {service['petDaycare']?'Yes':'No'}</li>
            <li>Pet Sitting: {service['petSitting']?'Yes':'No'}</li>
            <li>Pet Taxi: {service['petTaxi']?'Yes':'No'}</li>
          </p>
        </div>
      ))}
      <footer className="footer">
        <p className="footer-by">
          IT2002 App
        </p>
      </footer>
    </div>
  );
}

export default FindServices;
