import React, {useContext, useState} from "react";
import Navbar from "../NavigationBar/Navbar";
import { userContext, IUser, IUserDetails } from "../../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
function Help() {
  const { user, setUser} = useContext(userContext);
  const [profileDeleted, setProfileDeleted] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user.email) navigate("/login");
  }, [])

  function handleLogout() {
    const logOut : IUserDetails = {
      username: "",
      email: ""
    }
    setUser(logOut)
    navigate("/")

    // Send a POST request to clear the session data
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logOut)
    })
  }

  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete your sitter profile?");
    if (confirmed){
      // Send a POST request to clear the session data
      fetch('/deleteSitterProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          setProfileDeleted(true); // set the profileDeleted state to true
        }
      })
      .catch(err => console.log(err));
    }  
     
  }
  
  return (
    <div>
      <Navbar />
      {/* {!user.email && <Navigate to="/login" />} */}
      <Center>
      <VStack rounded={'md'} spacing='10px' mt="20px" border={'1px solid gray'} w="30%">
      <Text padding="2px" ><b>Username: </b>{user.username}</Text>
      <Text padding="2px" ><b>Email: </b>{user.email}</Text>
      </VStack>
      </Center>
      <Center>
        <HStack spacing='10px'>
            <Button
                m="20px"
                onClick={() => handleLogout()}
                padding="5px"
                border="2px solid gray"
                borderRadius="5px"
                bgColor="white"
                textColor="black"
                disabled={false}>
                  Logout
          </Button>
          <Button
                m="20px"
                onClick={() => handleDelete()}
                padding="5px"
                border="2px solid gray"
                borderRadius="5px"
                bgColor="white"
                textColor="black"
                disabled={false}>
                  Delete Sitter Profile
          </Button>
        </HStack>
      </Center>
      <footer className="footer">
        <p className="footer-by">
          IT2002 App
        </p>
      </footer>
    </div>
  );
}

export default Help;
