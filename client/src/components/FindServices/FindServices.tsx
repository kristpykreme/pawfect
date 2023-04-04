import React, {useState, useEffect, useContext} from "react";
import Navbar from "../NavigationBar/Navbar";
import * as api from "../Api/api";
import { Box, Input, Center, FormLabel, Stack, Checkbox, Flex, Button, Text} from '@chakra-ui/react'
import { userContext, IUser, IUserDetails } from "../../UserContext";

function FindServices() {
  const [data, setData] = useState([]);

  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // retrieve data from flask
  useEffect(() => {
    fetch("/find-services").then(
      res => res.json()).then(
        data => {
          setData(data)
          console.log(data)
        })
  }, [])

  async function handleHire(){
    console.log("hired")
    const hiringList = {
      hirerUsername: "admin",
      sitterUsername: "jiaxin",
      startDate: "05-05-2023",
      endDate: "08-08-2023",
      price: "10",
      dog: "false",
      cat: "true",
      petBoarding: "true",
      dogWalking: "false",
      petGrooming: "true",
      petDaycare: "true",
      petSitting: "true",
      petTaxi: "true"
    }
    console.log(hiringList)
    let response = await api.createJob(hiringList)
    console.log(response)
    if(response[0]){
      setMessage("Hired!")
      setErrorMessage("");
    }
    else{
      setMessage("");
      setErrorMessage("Something went wrong :(")
    }
  }

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
          <Button onClick={() => handleHire()}>Hire {service['username']}</Button>
          <div>
            {message &&<Text textAlign={"left"} fontSize="14px">{message}</Text>}
            {errorMessage &&<Text textAlign={"left"} fontSize="14px" color="red">{errorMessage}</Text>}
          </div>
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