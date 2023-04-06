import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import React, {useState, useEffect, useContext} from "react";
import * as api from "../Api/api";
import { userContext, IUser, IUserDetails } from "../../UserContext";
import { Navigate, useNavigate } from "react-router-dom";


  export default function SocialProfileWithImage(props : any) {
    const { user, setUser} = useContext(userContext);
    const [ button, disableButton ] = useState<boolean>(false);
    const username = props.username;
    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);
    const price = props.price;
    const dog = props.dog;
    const cat = props.cat;
    const petBoarding = props.petBoarding;
    const petWalking = props.petWalking;
    const petGrooming = props.getGrooming;
    const petDaycare = props.petDaycare;
    const petSitting = props.petSitting;
    const petTaxi = props.petTaxi;
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    async function handleHire(){
      if (!user.email) {
        navigate("/login");
      }
      else {
        const hiringList = {
          hirerUsername: user.username,
          sitterUsername: username
        }
        let response = await api.createJob(hiringList)
        if(response[0]){
          setMessage("Hired!")
          setErrorMessage("");
          disableButton(true);
        }
        else{
          setMessage("");
          setErrorMessage("Something went wrong :(");
          disableButton(false);
        }
      }
    }

    return (
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          margin={10}>
          {/* <Image
            h={'120px'}
            w={'full'}
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex> */}
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {username}
              </Heading>
              <Text color={'gray.500'}>Pet Sitter</Text>
            </Stack>
  
            <Text m={1}>
              <b>Start Date:</b> {startDate.toDateString()}
            </Text>
            <Text m={1}>
              <b>End Date:</b> {endDate.toDateString()}
            </Text>
            <Text m={1} textAlign={'center'}><b>${price}</b>/hour</Text>
            <Text m={2}><b>Available for:</b></Text>
            {cat ? <Text rounded={'md'} display={'inline-block'} as="span" border='1px solid gray' m={1} padding={1} textAlign={'center'} whiteSpace={"nowrap"}>Cats</Text> : <></>}
            {dog ? <Text rounded={'md'} display={'inline-block'} as="span" border='1px solid gray' m={1} padding={1} textAlign={'center'} whiteSpace={"nowrap"}>Dogs</Text> : <></>}
            <Text mt={2} mb={1}><b>Services:</b></Text>
            {petBoarding ? <Text rounded={'md'} border='1px solid gray' display={'inline-block'} m={1} padding={1} as="span" whiteSpace={"nowrap"}>Pet Boarding</Text> : <></>}
            {petWalking ? <Text rounded={'md'} border='1px solid gray' display={'inline-block'} m={1} padding={1} as="span"  whiteSpace={"nowrap"}>Pet Walking</Text> : <></>}
            {petGrooming ? <Text rounded={'md'} border='1px solid gray' display={'inline-block'} m={1} padding={1} as="span" whiteSpace={"nowrap"}>Pet Grooming</Text> : <></>}
            {petDaycare ? <Text rounded={'md'} border='1px solid gray' display={'inline-block'} m={1} padding={1} as="span" whiteSpace={"nowrap"}>Pet Daycare</Text> : <></>}
            {petSitting ? <Text rounded={'md'} border='1px solid gray' display={'inline-block'} m={1} padding={1} as="span" whiteSpace={"nowrap"}>Pet Sitting</Text> : <></>}
            {petTaxi ? <Text rounded={'md'} border='1px solid gray' display={'inline-block'} m={1} padding={1} as="span" whiteSpace={"nowrap"}>Pet Taxi</Text> : <></>}
            <Button
              w={'full'}  
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={() => handleHire()}
              isDisabled={button}>
              Hire
            </Button>
            {message &&<Text textAlign={"center"} fontSize="14px">{message}</Text>}
            {errorMessage &&<Text textAlign={"center"} fontSize="14px" color="red">{errorMessage}</Text>}
          </Box>
        </Box>
    );
  }