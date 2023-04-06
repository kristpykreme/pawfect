import React from "react";
import Navbar from "../NavigationBar/Navbar";
import { Box, Image, Heading, Text, Input, Button, Center, Divider, defineStyle, defineStyleConfig, extendTheme} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useRef, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/styles.module.css"
import * as api from "../Api/api"
import { userContext, IUser, IUserDetails } from "../../UserContext";


function Login() {
  const [email, setEmail] = React.useState<String>("");
  const [password, setPassword] = React.useState<String>("");
  const [message, setMessage] = React.useState<String>("");
  const [errorMessage, setErrorMessage] = React.useState<String>("");
  const { user, setUser} = useContext(userContext);

  const navigate = useNavigate();
  const location = useLocation();
  
  function handleEmailChange(email: any) {
    setEmail(email.target.value);
  }

  function handlePasswordChange(password: any) {
    setPassword(password.target.value);
  }

  async function handleSignIn() { 
    if (email != "" && password != "") {
      setMessage("");

      const existingUser = {
        email: email,
        password: password
      }
      let response = await api.signInUser(existingUser)
      if (response[0]) {
        const user : any = response[1]
        setErrorMessage("")
        setMessage(`Welcome ${user.username}`)
        const existingUser : IUserDetails = {
          username: user.username,
          email: user.email
        }
        setUser(existingUser)
        navigate('/')
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
            src="https://d2zp5xs5cp8zlg.cloudfront.net/image-35092-800.jpg"
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
            <Heading textAlign="center" id={styles.heading}>Sign In</Heading>
            <Text textAlign="center" id={styles.subHeading}>
                Sign in to access your account.
            </Text>
          <FormControl width="100%" margin="auto">
            <FormLabel id={styles.form1} mt="0px">
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
            <FormLabel id={styles.form1} mt="20px">
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
            onClick={() => handleSignIn()}
            padding="5px"
            border="2px solid gray"
            borderRadius="5px"
            bgColor="white"
            textColor="black"
            isDisabled={false}>
            Log in with Email
          </Button>
          </Center>
          <hr></hr>
            <Text textAlign="center" id={styles.subHeading}>
                Don't have an account? <Link to="/sign-up">
                Sign up!
                </Link>
            </Text>
          </Box>
          </>
        </Box>

      </Box>

    </div>
  );
}

export default Login;
