import React, {useState, useEffect, useContext} from "react";
import Navbar from "../NavigationBar/Navbar";
import * as api from "../Api/api";
import { Box, Input, Center, FormLabel, Stack, Checkbox, useCheckbox,useCheckboxGroup,Select,  CheckboxGroup, Flex, Button, Text, Card} from '@chakra-ui/react'
import { userContext, IUser, IUserDetails } from "../../UserContext";
import CardProp from "./CardProp";
import { Grid, GridItem } from '@chakra-ui/react'

export interface IHash {
  [details: string] : number;
} 

function FindServices() {
  const [data, setData] = useState([]);
  const [propsToNotShow, setPropsToNotShow] = useState([]);
  const { user, setUser} = useContext(userContext);
  const [filterParam, setFilterParam] = useState("all");


  const [cat, setCat] = useState<boolean>(true);
  const [dog, setDog] = useState<boolean>(true);
  const [petBoarding, setPetBoarding] = useState<boolean>(true);
  const [dogWalking, setDogWalking] = useState<boolean>(true);
  const [petGrooming, setPetGrooming] = useState<boolean>(true);
  const [petDaycare, setPetDaycare] = useState<boolean>(true);
  const [petSitting, setPetSitting] = useState<boolean>(true);
  const [petTaxi, setPetTaxi] = useState<boolean>(true);

  // retrieve data from flask
  useEffect(() => {
    fetch("/find-services").then(
      res => res.json()).then(
        data => {
          setData(data[0]);
          let noshow: IHash = {};   
          for (let i = 0; i < Object.keys(data[1]).length; i++) {
            if (user.username in data[1][i]) {
              noshow[data[1][i][user.username]] = 0;
            }
          }
          const arr : any = Object.keys(noshow);
          setPropsToNotShow(arr);
        })
  }, [user])

  return (
    <div>
      <Navbar />
      <Center>
      <Select
      w="30%"
      mt="20px"
      border={"1px"}
      onChange={(e) => {
      setFilterParam(e.target.value);
       }}
       className="custom-select"
       aria-label="Filter Posts By Animals">
        <option value="all">Cats, Dogs</option>
        <option value="cat">Cats</option>
        <option value="dog">Dogs</option>
        </Select>
        <span className="focus"></span>
      </Center>
      <Center>
      <Grid mt={10} templateColumns='repeat(4, 1fr)'>
      {data.filter(service => {
        if (filterParam in service && service[filterParam]===true) {
          return service
        }
        else if (filterParam === "all") {
          return service
        }
      }).map(service => (
        (!propsToNotShow.includes(service['username'])) &&
        (service['username'] !== user.username) &&
          <GridItem>
          <CardProp {...Object.assign(service)}/>
          </GridItem>
      ))}
      </Grid>
      </Center>
    </div>
  );
}

export default FindServices;