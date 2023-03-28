import React, {useState, useEffect, useContext} from "react";
import Navbar from "../NavigationBar/Navbar";
import * as api from "../Api/api";
import DatePicker from "react-datepicker";
import { Box, Input, Center, FormLabel, Stack, Checkbox, Flex, Button, Text} from '@chakra-ui/react'
import styles from "../styles/styles.module.css"
import { userContext, IUser, IUserDetails } from "../../UserContext";
import "react-datepicker/dist/react-datepicker.css";

function PetSitter() {
  const [start, setStart] = useState<any>(new Date());
  const [end, setEnd] = useState<any>(new Date());
  const [cat, setCat] = useState<boolean>(false);
  const [dog, setDog] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [petBoarding, setPetBoarding] = useState<boolean>(false);
  const [dogWalking, setDogWalking] = useState<boolean>(false);
  const [petGrooming, setPetGrooming] = useState<boolean>(false);
  const [petDaycare, setPetDaycare] = useState<boolean>(false);
  const [petSitting, setPetSitting] = useState<boolean>(false);
  const [petTaxi, setPetTaxi] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { user, setUser} = useContext(userContext);

  function handlePrice(e : any) {
    setPrice(e.target.value);
  }

  async function handleSumbit() {
    if (!user.username) {
      alert("Sign in first");
    }
    else {
        const petSitterList = {
        //best if u do this
        username: user.username,
        startDate: start.toJSON().split("T", 2)[0],
        endDate: end.toJSON().split("T", 2)[0],
        price: price,
        dog: dog,
        cat: cat,
        petBoarding: petBoarding,
        dogWalking: dogWalking,
        petGrooming: petGrooming,
        petDaycare: petDaycare,
        petSitting: petSitting,
        petTaxi: petTaxi
      }
      console.log(petSitterList)
      let response = await api.createProfile(petSitterList)
      if (response[0]) {
        setMessage("Form submitted!")
        setErrorMessage("");
      }
      else {
        setMessage("");
        setErrorMessage("Something went wrong :(")
      }
    }
  }

  return (
    <div>
    <Navbar />
        <h1></h1>
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        border="1px solid black"
      >
            <Box textAlign={"center"} m="10px">
            <FormLabel m="10px" textAlign={"center"}>
              Start Date:</FormLabel>
              <DatePicker selected={start} onChange={(date : any) => setStart(date)}
            ></DatePicker>
            </Box>
            <></>
            <Box textAlign={"center"} m="10px">
            <FormLabel m="10px" textAlign={"center"}>
              End Date:</FormLabel>
              <DatePicker selected={end} onChange={(date : any) => setEnd(date)}
            ></DatePicker>
            </Box>
            <></>
            <Center>
            <FormLabel m="10px" textAlign={"center"}>
              Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Input
                width="50%"
                border="1px solid gray"
                borderRadius="5px 5px 5px 5px"
                type="number"
                padding="5px"
                min={0}
                onChange={(e) => handlePrice(e)}
                // maxLength={}
              /></FormLabel>
            </Center>
            <></>
            <Box textAlign={"center"}>
            <Checkbox onChange={() => setCat(!cat)} m="10px">Cat</Checkbox>
            <Checkbox onChange={() => setDog(!dog)} m="10px">Dog</Checkbox>
            </Box>
            <></>
            <Box textAlign={"center"}>
            <Checkbox onChange={() => setPetBoarding(!petBoarding)} m="10px">Pet Boarding</Checkbox>
            <Checkbox onChange={() => setDogWalking(!dogWalking)} m="10px">Dog Walking</Checkbox>
            <Checkbox onChange={() => setPetGrooming(!petGrooming)} m="10px">Pet Grooming</Checkbox>
            <Checkbox onChange={() => setPetDaycare(!petDaycare)} m="10px">Pet Daycare</Checkbox>
            <Checkbox onChange={() => setPetSitting(!petSitting)} m="10px">Pet Sitting</Checkbox>
            <Checkbox onChange={() => setPetTaxi(!petTaxi)} m="10px">Pet Taxi</Checkbox>
            </Box>
            <></>
            <Box textAlign={"center"}>
            <Button
              m="20px"
              onClick={() => handleSumbit()}
              padding="5px"
              border="2px solid gray"
              borderRadius="5px"
              bgColor="white"
              textColor="black"
              disabled={false}>
              Submit Form
            </Button>
            </Box>
      </Box>
    </Flex>
    <Center>
          {message &&<Text textAlign={"center"} fontSize="14px">{message}</Text>}
          {errorMessage &&<Text textAlign={"center"} fontSize="14px" color="red">{errorMessage}</Text>}
    </Center>
      <footer className="footer">
        <p className="footer-by">
          IT2002 App
        </p>
      </footer>
    </div>
  );
}

export default PetSitter;