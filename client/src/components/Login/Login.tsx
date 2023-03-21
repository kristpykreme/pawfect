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
import * as api from "../Api/api"

export const initialState = {
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  password: '',
  confirmPassword: '',
  otp: '',
  isLoading: false,
  isError: false,
  isAuth: false,
  // users:[]
}

const existingUser = {
  existingEmail: '',
  existingPassword: '',
}


let userExist;

function Login() {
  //-------------------------------HOOKS-------------------------------------------------------------
  const [userData, setUserData] = useState(initialState)
  const [existingUserData, setExistingUserData] = useState(existingUser)
  const [checkMsg, setCheckMsg] = useState('Incorrect OTP')
  const [color, setColor] = useState('red')
  const [otp] = useState('1234')
  const [visible, setVisible] = useState(false)
  const btnRef = useRef<any>()
  const loginBtnRef = useRef()
  const otpRef = useRef<any>()
  const navigate = useNavigate()
  const [showMatchStatus, setShowMatchStatus] = useState(false)
  const [matchStatus, setMatchStatus] = useState('passwords dont match')

  const [showForm1, setShowForm1] = useState(true)
  const [showForm2, setShowForm2] = useState(false)
  const [showForm3, setShowForm3] = useState(false)

  //------------------------FUNCTIONS----------------------------------------------------------
  const getInput = (e : any) => {
    let name = e.target.name
    // console.log(e.target.name)

    if (name === 'existingEmail' || name === 'existingPassword') {
      setExistingUserData(
        (prev) => (prev = { ...prev, [name]: e.target.value }),
      )
      console.log(name)
    } else {
      setUserData((prev) => (prev = { ...prev, [name]: e.target.value }))
      if (e.target.name === 'mobile') {
        if (btnRef.current != undefined) {
          btnRef.current.disabled = false
        }
      }

      if (e.target.name === 'confirmPassword') {
        setShowMatchStatus(true)
        if (e.target.value === userData.password) {
          if (otpRef.current != undefined) {
            otpRef.current.disabled = false
          }
          setMatchStatus('passwords match')
          setColor('green')
        } else {
          if (otpRef.current != undefined) {
            otpRef.current.disabled = true
          }
          setMatchStatus('passwords dont match')
          setColor('red')
        }
        // console.log(userData,"outside")
      }
      if (e.target.name === 'otp') {
        setShowMatchStatus(false)
        setVisible(true)
        if (e.target.value === otp) {
          setCheckMsg('OTP Matched')
          setColor('green')
          setUserData((prev) => (prev = { ...prev, isAuth: true }))
        } else {
          setCheckMsg('Incorrect OTP')
          setColor('red')
        }
        if (e.target.value.length === 0) {
          // console.log("len is 0", e.target.value)
          setVisible(false)
        }
      }
    }
  }

  // const toggleForms = async (e) => {
    // console.log(e.target.innerText)
    // console.log("clicking of proceed button");
    // if (e.target.innerText === 'Proceed') {
    //   await dispatch(getUserLoginDetails(userData.mobile))
    //   userExist = JSON.parse(localStorage.getItem('currentUser'))

    //   console.log(userExist, 'current which tried to login')
    //   if (userExist) {
    //     updateUserAuthStatus(userExist.id, { isAuth: true })
    //     userExist.isAuth = true
    //     localStorage.setItem('currentUser', JSON.stringify(userExist))
    //     setShowForm3(true)
    //     // setShowForm1(prev => !prev);
    //     setShowForm1(false)
    //     setShowForm2(false)
    //     console.log('yo')
    //   } else {
    //     alert('Default OTP: 1234')

    //     setShowForm3(false)
    //     setVisible(false)
    //     setShowForm1((prev) => !prev)
    //     setShowForm2((prev) => !prev)
    //   }
    // } else if (e.target.innerText === 'Cancel') {
    //   setUserData(initialState)
    // }
    // // else{

    // //   setVisible(false)
    // //   setShowForm1((prev) => !prev)
    // //   setShowForm2((prev) => !prev)
    // //   setShowForm3(false)
    // // }

  return (
    <div>
      <Navbar />
      <h1>Sign in</h1>

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
                name="email"
                value={userData.email}
                onChange={getInput}
                padding="5px"
                // maxLength={}
            />
            <FormLabel id={styles.form1} mt="20px">
              Password
            </FormLabel>
            <Input
                width="100%"
                border="1px solid gray"
                borderRadius="5px 5px 5px 5px"
                type="text"
                name="password"
                value={userData.password}
                onChange={getInput}
                padding="5px"
                // maxLength={}
            />
            
          </FormControl>
          <Center>
          <Button m="20px" padding="5px" border="2px solid gray" borderRadius="5px" bgColor="white" textColor="black" disabled={false}>Log in with Email</Button>
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
