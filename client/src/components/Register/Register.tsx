import React from "react";
import Navbar from "../NavigationBar/Navbar";
import { Box, Image, Heading, Text, Input, Button, Center, Divider, defineStyle, defineStyleConfig, extendTheme} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../styles/styles.module.css"
import * as api from "../Api/api";

function Register() {
  const [username, setUsername] = React.useState<String>("");
  const [email, setEmail] = React.useState<String>("");
  const [password, setPassword] = React.useState<String>("");
  const [message, setMessage] = React.useState<String>("");
  const [newUser, setNewUser] = React.useState<any>();
  
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
      setNewUser(newUser);
      console.log(newUser);
      let success = await api.insertEntry(newUser)
        if (!success) {
            return
      }
    }
    else {
      setMessage("Fields cannot be empty");
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
                name="username"
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
                name="email"
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
                type="text"
                name="password"
                padding="5px"
                // maxLength={}
                onChange={(password) => handlePasswordChange(password)}
            />
          </FormControl>
          <Center>
          {message && <FormLabel mt="10px">{message}</FormLabel>}
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
            <Text textAlign="center" id={styles.subHeading}>
                Already have a Pawfect account? <Link to="/login">
                Log in!
                </Link>
            </Text>
          </Box>
          </>
        </Box>

      </Box>

    </div>
  );
}

export default Register;