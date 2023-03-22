import React, {useContext} from "react";
import { userContext, IUser, IUserDetails } from "../../UserContext";
import Navbar from "../NavigationBar/Navbar";
import { Box, Image, Heading, Text, Input, Button, Center, Divider, defineStyle, defineStyleConfig, extendTheme} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/styles.module.css"
import * as api from "../Api/api";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const { user, setUser} = useContext(userContext);

  function handleUsernameChange(username: any) {
    setUsername(username.target.value);
  }

  function handleEmailChange(email: any) {
    setEmail(email.target.value);
  }

  function handlePasswordChange(password: any) {
    setPassword(password.target.value);
  }

  async function handleSignUp() { 
    if (username != "" && email != "" && password != "") {
      setMessage("");

      const newUser = {
        username: username,
        email: email,
        password: password
      }
      let response = await api.registerUser(newUser)
      if (response[0]) {
        setErrorMessage("")
        setMessage("User created :)")
        const user : IUserDetails = {
          username: username,
          email: email
        }
        setUser(user)
        navigate('/account')
      }
      
      else {
        setMessage("");
        setErrorMessage(response[1] as string)
      }
    }
    else {
      setErrorMessage("Fields cannot be empty");
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Sign up</h1>

      <Box
      id={styles.mainContainer}
      display="flex"
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
      width="80%"
      height="150%"
      margin="auto"
      marginTop="70px"
      >
        <Box w="40%" id={styles.subContainer}>
          <Image
            w="100%"
            h="100%"
            id={styles.img}
            objectFit="cover"
            src="https://images.ctfassets.net/ub3bwfd53mwy/5zi8myLobtihb1cWl3tj8L/45a40e66765f26beddf7eeee29f74723/6_Image.jpg?w=750"
            alt="loginImage"
            borderRadius="10px 0px 0px 10px"
          />
        </Box>
        <Box id={styles.subContainer2} w="60%">
          <>
          <Box
              margin="auto"
              w="60%"
              mt="20px"
          >
            <Heading textAlign="center" id={styles.heading}>Sign Up</Heading>
            <Text textAlign="center" id={styles.subHeading}>
                Sign up to continue.
            </Text>
            <FormLabel id={styles.form1} mt="10px">
              Username
            </FormLabel>
            <Input
                width="100%"
                border="1px solid gray"
                borderRadius="5px 5px 5px 5px"
                type="text"
                padding="5px"
                // maxLength={}
                onChange={(username) => handleUsernameChange(username)}
            />
            <FormControl width="100%" margin="auto">
            <FormLabel id={styles.form1} mt="10px">
              Email
            </FormLabel>
            <Input
                width="100%"
                border="1px solid gray"
                borderRadius="5px 5px 5px 5px"
                type="text"
                padding="5px"
                // maxLength={}
                onChange={(email) => handleEmailChange(email)}
                
            />
            <FormLabel id={styles.form1} mt="10px">
              Password
            </FormLabel>
            <Input
                width="100%"
                border="1px solid gray"
                borderRadius="5px 5px 5px 5px"
                type="password"
                padding="5px"
                // maxLength={}
                onChange={(password) => handlePasswordChange(password)}
            />
          </FormControl>
          <Center>
          {message &&<Text textAlign={"center"} fontSize="14px">{message}</Text>}
          {errorMessage &&<Text textAlign={"center"} fontSize="14px" color="red">{errorMessage}</Text>}
          </Center>
          <Center>
          <Button
            m="20px"
            onClick={() => handleSignUp()}
            padding="5px"
            border="2px solid gray"
            borderRadius="5px"
            bgColor="white"
            textColor="black"
            disabled={false}>
              Sign up
          </Button>
          </Center>
          <hr></hr>
          <Center>
            <Text textAlign={"center"} id={styles.subHeading}>
                Already have a Pawfect account? <Link to="/login">
                Log in!
                </Link>
            </Text>
            </Center>
          </Box>
          </>
        </Box>

      </Box>

    </div>
  );
}

export default Register;