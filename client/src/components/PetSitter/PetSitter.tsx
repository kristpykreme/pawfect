import React from "react";
import Navbar from "../NavigationBar/Navbar";
import { Button }from '@chakra-ui/react';
import * as api from "../Api/api";

function PetSitter() {
  async function handleDummyDataz() {
    const petSitterList = {
            //best if u do this
            "username":"admin",
            "startDate": "01-03-2023",
            "endDate": "08-03-2023",
            "price": "5",
            "dog": "true",
            "cat": "true",
            "petBoarding":"true",
            "dogWalking":"true",
            "petGrooming": "false",
            "petDaycare": "false",
            "petSitting": "false",
            "petTaxi": "true"
        }
    let response = await api.createProfile(petSitterList)
    console.log(response);
  }
  return (
    <div>
      <Navbar />
      <h1>Become a Pet Sitter</h1>
      <Button onClick={() => handleDummyDataz()}>
      POST
      </Button>

      <footer className="footer">
        <p className="footer-by">
          IT2002 App
        </p>
      </footer>
    </div>
  );
}

export default PetSitter;