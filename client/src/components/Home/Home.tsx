import React, { useContext } from "react";
import Navbar from "../NavigationBar/Navbar";
import { Box, Image, Heading, Text, Input, Button, Center, Divider, defineStyle, defineStyleConfig, extendTheme} from '@chakra-ui/react'
import styles from "../styles/styles.module.css"
import { userContext } from "../../UserContext";

function Home() {

  const { user, setUser} = useContext(userContext);
  return (
    <div>
      <Navbar />
      <h1>Hello {user.username}</h1>
      <Box
      id={styles.mainContainer}
      display="flex"
      borderRadius="10px"
      width="90%"
      height="1000px"
      margin="auto"
      marginTop="70px"
      >
        <Box w="100%" h="50%" id={styles.subContainer}>
          <Image
            objectFit="cover"
            object-position= "-20% 0"
            w="100%"
            h="50%"
            id={styles.img}
            src="https://api.time.com/wp-content/uploads/2015/04/dog-child.jpg"
            alt="loginImage"
            borderRadius="10px"
          />
          <div>
            Hired Jobs:
        
          </div>
        </Box>

      </Box>
      <footer className="footer">
        <p className="footer-by">
          IT2002 App
        </p>
      </footer>
    </div>
  );
}

export default Home;